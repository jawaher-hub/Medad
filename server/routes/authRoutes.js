const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      ...userData,
      password: hashedPassword
    });
    
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    
    if (user.status === 'Pending') return res.status(403).json({ error: 'Account pending approval' });
    if (user.status === 'Suspended') return res.status(403).json({ error: 'Account suspended' });
    
    res.json({
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/pending', async (req, res) => {
    try {
        const pendingUsers = await User.find({ status: 'Pending' });
        res.json(pendingUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/update-status/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/update-profile/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
                bio: req.body.bio
            },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;