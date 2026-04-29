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
module.exports = router;