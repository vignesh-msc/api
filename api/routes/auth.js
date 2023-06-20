const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../api/models/User');
const apiKey = require('../config/config.json');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('inside login hndler: req.body',req.body)
    // Check if user exists
    const user = await User.findOne({ email });
    const userId = user._id;
    
    console.log('user for roles',user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const payload= { userId: userId, email: user.email};
    // Generate and send JWT token
    const token = jwt.sign(
      payload,
      apiKey.jwtSecret,
    );
    console.log('user.roles',user.roles);
    res.status(200).json({roles:user.roles, token,userID:userId ,isprofile:user.isprofile});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create the user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    // Generate and send JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email,isprofile:user.isprofile },
      apiKey.jwtSecret,
      { expiresIn: '1h' }
    );
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
