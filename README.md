Love Letter Scheduler is a Node.js application that schedules and sends love letters via email. It uses the Gemini API for generating love letters and sends them using an email service.

## Features

- Schedule love letters to be sent at specific times
- Generate love letters using the Gemini API
- Send love letters via email

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/love-letter-scheduler.git
    cd love-letter-scheduler
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/0) file in the root directory and add your environment variables:
    ```properties
    PORT=3000
    MONGO_URI=mongodb+srv://<your_username>:<your_password>@<your_cluster_url>/love_letter_db?retryWrites=true&w=majority
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_password
    RECIPIENT_EMAIL=girlfriend@example.com
    ```

4. Start the application:
    ```bash
    npm start
    ```

## Project Structure

```plaintext
love-letter-scheduler/
├── .env          # Environment variables (API keys, database connection)
├── package.json  # Project dependencies and scripts
├── server.js     # Main entry point
├── config/       # Configuration files
│   └── database.js # Database connection configuration
├── models/       # Data models (e.g., LoveLetter)
│   └── LoveLetter.js
├── routes/       # API endpoints (if you want a UI for managing letters)
│   └── loveLetters.js
├── services/     # Logic for generating and sending letters
│   ├── geminiService.js  # Interaction with Gemini API
│   └── emailService.js # Sending emails
├── scheduler.js  # Scheduled task for sending letters
└── utils/        # Utility functions
    └── dateUtils.js