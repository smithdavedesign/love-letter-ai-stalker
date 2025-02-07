const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); // Added Morgan
// Load env vars
dotenv.config();
const connectDB = require('./config/database');
const scheduler = require('./scheduler'); // Changed variable name to 'scheduler'

const app = express();
const port = process.env.PORT || 3000;


// Connect to database
connectDB().then(client => {
    // Initialize middleware
    app.use(express.json());
    app.use(morgan('dev')); // Added Morgan for logging
  
    // Start the scheduler
    scheduler.start(); // Call the start function on the scheduler object
  
    app.get('/', (req, res) => {
      res.send('Love Letter Scheduler is running!');
    });
  
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }).catch(error => {
    console.error('Failed to connect to the database:', error);
  });