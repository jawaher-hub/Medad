const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:restaurantId', async (req, res) => {
  const feedback = await Feedback.find({ restaurantId: req.params.restaurantId });
  res.json(feedback);
});
module.exports = router;