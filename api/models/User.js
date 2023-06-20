const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isprofile: {
    type: Boolean,
    default: false,
    required: true
  },
  roles: {
    type: [String], // Specify an array of strings for roles
    default: ['user'] // Set a default role (optional)
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
