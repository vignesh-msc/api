const mongoose = require('mongoose');

const employeehistorySchema = new mongoose.Schema({
  originalData: {
    type: Object,
    required: true,
  },
  modifiedData: {
    type: Object,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employeeentity',
  },
  // Additional fields as needed
});

const employeehistory = mongoose.model('employeehistory', employeehistorySchema);
module.exports = employeehistory;
