const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Listing = require('../models/Listing');

router.post('/', async (req, res) => {
  try {
    const { listingId, charityId } = req.body;
    if (!listingId) return res.status(400).json({ error: 'listingId is required' });

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    const newRequest = new Request({
      listingId,
      restaurantId: listing.restaurantId,
      charityId,
      status: 'Pending',
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/charity', async (req, res) => {
  try {
    const filter = {};
    if (req.query.charityId) filter.charityId = req.query.charityId;

    const requests = await Request.find(filter)
      .populate('listingId')
      .populate('restaurantId', 'name')
      .populate('charityId', 'name');

    const normalized = requests.map(r => ({
      ...r.toObject(),
      listingTitle: r.listingId?.foodName || r.listingId?.title,
      restaurantName: r.restaurantId?.name,
      quantity: r.listingId?.quantity,
      pickupDate: r.listingId?.expiryTime || r.listingId?.expiryDate,
      status: r.status === 'Pending' ? 'requested'
            : r.status === 'Accepted' ? 'approved'
            : r.status === 'Assigned' ? 'assigned'
            : r.status === 'Delivered' ? 'completed'
            : r.status === 'Rejected' ? 'rejected'
            : r.status,
    }));

    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/restaurant', async (req, res) => {
  try {
    const filter = {};
    if (req.query.restaurantId) filter.restaurantId = req.query.restaurantId;

    const requests = await Request.find(filter)
      .populate('listingId')
      .populate('charityId', 'name');

    const normalized = requests.map(r => ({
      ...r.toObject(),
      listingTitle: r.listingId?.foodName || r.listingId?.title,
      charityName: r.charityId?.name,
      quantity: r.listingId?.quantity,
      pickupDate: r.listingId?.expiryTime || r.listingId?.expiryDate,
    }));

    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const status = req.body.status;
    const mapped = status === 'approved' ? 'Accepted'
      : status === 'rejected' ? 'Rejected'
      : status;

    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      { status: mapped },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/assign/:id', async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      {
        representativeName: req.body.name,
        representativePhone: req.body.phone,
        status: 'Assigned',
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
        proofPhoto: req.body.photo,
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;