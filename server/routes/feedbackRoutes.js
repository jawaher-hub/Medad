const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const Request = require('../models/Request');

router.post('/submit', async (req, res) => {
  const { requestId, rating, comment } = req.body;
  
  try {
    
    const request = await Request.findById(requestId);
    if (!request || request.status !== 'Delivered') {
      return res.status(400).json({ error: 'Cannot rate before delivery' });
    }

    const newFeedback = new Feedback({
      restaurantId: request.restaurantId,
      charityId: request.charityId,
      requestId,
      rating,
      comment
    });

    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;