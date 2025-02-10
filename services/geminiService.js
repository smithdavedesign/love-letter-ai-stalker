const axios = require('axios');
const db = require('../config/database');

const generateLoveLetter = async () => {
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;

    const prompt = `Write a short, friendly letter.`;

    const requestData = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    try {
        const response = await axios.post(apiUrl, requestData);
        console.log(response.data);
        const letter = response.data.candidates[0].content.parts[0].text;
        console.log(letter);

        // Save to database
        const query = 'INSERT INTO love_letters (content) VALUES (?)';
        return new Promise((resolve, reject) => {
            db.run(query, [letter], function (err) {
                if (err) {
                    console.error("Error inserting love letter:", err.message);
                    reject(err);
                } else {
                    console.log(`A row has been inserted with rowid ${this.lastID}`);
                    resolve(letter);
                }
            });
        });


    } catch (error) {
        console.error('Error generating love letter:', error);
        console.error("Full Gemini API Error:", error.response ? error.response.data : error.message); // Log the full error
        return error; // Re-throw to be handled by the caller.
    }
};

module.exports = { generateLoveLetter };