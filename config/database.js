const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/loveletters.db'); // Store the database file in a 'data' directory. Create this directory.

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
        // Create the table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS love_letters (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                scheduledFor DATETIME,
                sent BOOLEAN DEFAULT 0
            )
        `, (err) => {
            if (err) {
                console.error("Error creating table:", err.message);
            }
        });
    }
});

module.exports = db;

