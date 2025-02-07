const axios = require('axios');
const LoveLetter = require('../models/LoveLetter'); // Import the model (Mongoose)

const generateLoveLetter = async () => {
    const apiKey = process.env.OPENAI_API_KEY;
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;

    const prompt = `Write a short, heartfelt love letter to my girlfriend.  Mention that she is beautiful, intelligent, kind, and makes me incredibly happy. Be creative, funny and romantic.`;

    const requestData = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    try {
        const response = await axios.post(apiUrl, requestData);
        const letter = response.data.candidates[0].content.parts[0].text;
        console.log(letter);

        // Save to database
        const newLoveLetter = new LoveLetter({ content: letter });  // Mongoose
        await newLoveLetter.save();
        console.log('Love letter saved to database.');

        return letter;
    } catch (error) {
        console.error('Error generating love letter:', error);
        throw error; // Re-throw to be handled by the caller.
    }
};

module.exports = { generateLoveLetter };