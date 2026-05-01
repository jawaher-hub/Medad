const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

router.post('/add', async (req, res) => {
    try {
        const newListing = new Listing(req.body);
        const savedListing = await newListing.save();
        res.status(201).json(savedListing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedListing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/my-listings', async (req, res) => {
    try {
        const restaurantId = req.query.restaurantId; 
        const listings = await Listing.find({ restaurantId: restaurantId });
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/flagged', async (req, res) => {
    try {
        const flaggedListings = await Listing.find({ isFlagged: true });
        res.json(flaggedListings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/clear-flag/:id', async (req, res) => {
    try {
        const clearedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            { isFlagged: false },
            { new: true }
        );
        res.json(clearedListing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;