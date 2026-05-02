const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  charityId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected', 'Assigned', 'Delivered'], default: 'Pending' },
  pickupRepresentative: String,
  representativeName: String,
  representativePhone: String,
  deliveredAt: Date,
  proofPhoto: String
});
module.exports = mongoose.model('Request', requestSchema);