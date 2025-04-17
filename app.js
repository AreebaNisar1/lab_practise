// ================ STEP 6: APP & SERVER ================
// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const cron = require('node-cron');
const Event = require('./models/Event');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);

// Reminder System (checks every minute)
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const upcoming = await Event.find({ reminderTime: { $lte: now } });
  for (const event of upcoming) {
    // Send email (simplified for example)
    console.log(`Reminder: ${event.title} is coming up!`);
    await Event.deleteOne({ _id: event._id }); // Avoid resending
  }
});

module.exports = app;