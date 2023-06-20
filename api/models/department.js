const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const department = mongoose.model('department', departmentSchema,'department');

module.exports = department;