const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  description: String,
  quantity: Number,
  expiryTime: Date,
  photoUrl: String,
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Available', 'Requested', 'Taken'], default: 'Available' }
});
module.exports = mongoose.model('Listing', listingSchema);