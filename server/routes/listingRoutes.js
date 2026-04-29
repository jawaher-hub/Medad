const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete('/:id', async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});
module.exports = router;