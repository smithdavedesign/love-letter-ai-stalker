const express = require('express');
const router = express.Router();
const db = require('../config/database');
const geminiService = require('../services/geminiService'); // Import Gemini service

// TEST Gemini Route - Generates and returns a love letter from Gemini
router.get('/testgemini', async (req, res) => {
  try {
    const letter = await geminiService.generateLoveLetter();
    // to do - save the letter to the database
    // to do - send the letter to the recipient email
    res.send(letter); // Send the generated letter as the response
  } catch (error) {
    console.error("Error testing Gemini:", error);
    res.status(500).send("Error generating love letter.");
  }
});

// GET all love letters
router.get('/', (req, res) => {
  const query = 'SELECT * FROM love_letters';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    res.json(rows);
  });
});

// GET a specific love letter by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM love_letters WHERE id = ?';

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Love letter not found' });
    }
    res.json(row);
  });
});

// POST a new love letter (for manual creation, if needed)
router.post('/', (req, res) => {
  const content = req.body.content;
  const query = 'INSERT INTO love_letters (content) VALUES (?)';

  db.run(query, [content], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    // Retrieve the newly inserted row
    const newId = this.lastID;
    db.get('SELECT * FROM love_letters WHERE id = ?', [newId], (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: err.message });
      }
      res.status(201).json(row);
    });
  });
});

// PUT (Update) an existing love letter (example - if you want to edit)
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const content = req.body.content;
    const query = 'UPDATE love_letters SET content = ? WHERE id = ?';

    db.run(query, [content, id], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Love letter not found' });
        }
        db.get('SELECT * FROM love_letters WHERE id = ?', [id], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: err.message });
            }
            res.json(row);
        });

    });
});

// DELETE a love letter
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM love_letters WHERE id = ?';

  db.run(query, [id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Love letter not found' });
    }
    res.json({ message: 'Love letter deleted' });
  });
});



module.exports = router;