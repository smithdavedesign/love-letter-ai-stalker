// models/LoveLetter.js
const mongoose = require('mongoose');

const LoveLetterSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  sentAt: {
    type: Date,
    default: null
  },
  isSent: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('LoveLetter', LoveLetterSchema);