const express = require('express');
const router = express.Router();
const LoveLetter = require('../models/LoveLetter');

// Create a new love letter
router.post('/', async (req, res) => {
    try {
        const loveLetter = new LoveLetter(req.body);
        await loveLetter.save();
        res.status(201).send(loveLetter);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all love letters
router.get('/', async (req, res) => {
    try {
        const loveLetters = await LoveLetter.find();
        res.status(200).send(loveLetters);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a love letter by ID
router.get('/:id', async (req, res) => {
    try {
        const loveLetter = await LoveLetter.findById(req.params.id);
        if (!loveLetter) {
            return res.status(404).send();
        }
        res.status(200).send(loveLetter);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a love letter by ID
router.patch('/:id', async (req, res) => {
    try {
        const loveLetter = await LoveLetter.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!loveLetter) {
            return res.status(404).send();
        }
        res.status(200).send(loveLetter);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a love letter by ID
router.delete('/:id', async (req, res) => {
    try {
        const loveLetter = await LoveLetter.findByIdAndDelete(req.params.id);
        if (!loveLetter) {
            return res.status(404).send();
        }
        res.status(200).send(loveLetter);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;