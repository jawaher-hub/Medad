const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  charityId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
});
module.exports = mongoose.model('Feedback', feedbackSchema);