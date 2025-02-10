const cron = require('cron');
const geminiService = require('./services/geminiService');
const emailService = require('./services/emailService');
const db = require('./config/database');

const job = new cron.CronJob('0 8 * * *', async () => { // Runs at 8:00 AM every day
    console.log('Cron job started...');
    try {
        const loveLetterContent = await geminiService.generateLoveLetter();
        await emailService.sendEmail(process.env.RECEIVER_EMAIL, 'A Little Something for You ❤️', loveLetterContent);

        // Update the LoveLetter in the database to mark as sent
        const query = 'UPDATE love_letters SET sent = 1 WHERE id = (SELECT MAX(id) FROM love_letters)';

        db.run(query, function (err) {
            if (err) {
                console.error("Error updating love letter:", err.message);
            } else {
                console.log(`Rows updated: ${this.changes}`);
                console.log('Love letter marked as sent in the database.');
            }
        });

        console.log('Cron job completed successfully.');
    } catch (error) {
        console.error('Error during cron job:', error);
    }
}, null, false, 'America/Los_Angeles'); // replace with your timezone

module.exports = {
    start: () => job.start(),
    stop: () => job.stop()
};