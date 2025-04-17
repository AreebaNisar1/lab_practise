// ================ STEP 4: EVENT ROUTES ================
// routes/events.js
const express = require('express');
const Event = require('../models/Event');
const auth = require('../middlewares/auth');
const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  const event = new Event({ ...req.body, userId: req.user.id });
  await event.save();
  res.status(201).json(event);
});

router.get('/', async (req, res) => {
  const query = { userId: req.user.id };
  if (req.query.category) query.category = req.query.category;
  const events = await Event.find(query).sort('date');
  res.json(events);
});

module.exports = router;
