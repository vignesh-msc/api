const mongoose = require('mongoose');

const statutoryDetailsSchema =  mongoose.Schema({
  panNumber: { type: String, required: true },
  aadhaarNumber: { type: String, required: true },
  esiNumber: { type: String , required: true},
  pfNumber: { type: String , required: true},
  // Other statutory details fields...
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employeeentity'
  }
} ,{ strictPopulate: false });

const statutorydetails =mongoose.model('statutorydetails', statutoryDetailsSchema,'statutorydetails');
module.exports = statutorydetails;
