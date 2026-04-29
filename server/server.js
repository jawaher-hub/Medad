const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

if (!MONGODB_URI) {
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('Error:', err.message);
    process.exit(1);
  });

const listingRoutes = require('./routes/listingRoutes');
app.use('/api/listings', listingRoutes);
const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.get('/', (req, res) => {
  res.send('MEDAD Backend is running!!');
});
const feedbackRoutes = require('./routes/feedbackRoutes');
app.use('/api/feedback', feedbackRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});