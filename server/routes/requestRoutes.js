const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

router.post('/', async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/charity/:id', async (req, res) => {
  try {
    const requests = await Request.find({ charityId: req.params.id }).populate('listingId');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/assign/:id', async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      { 
        representativeName: req.body.name, 
        representativePhone: req.body.phone,
        status: 'Assigned' 
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/confirm/:id', async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'Delivered',
        deliveredAt: Date.now(),
        proofPhoto: req.body.photo
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;