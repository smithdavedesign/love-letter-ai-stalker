const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config();
//const db = require('./config/database'); // Import the database connection
//const scheduler = require('./scheduler');
const loveLetterRoutes = require('./routes/loveLetters'); // Import the routes

const app = express();
const port = process.env.PORT || 4000;

// Initialize middleware
app.use(express.json());
app.use(morgan('dev')); // Added Morgan for logging

// Mount the routes
app.use('/api/loveletters', loveLetterRoutes); // Use the routes

// Start the scheduler
//qscheduler.start(); // Call the start function on the scheduler object

app.get('/', (req, res) => {
    res.send('Love Letter Scheduler is running!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
