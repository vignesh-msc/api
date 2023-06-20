const mongoose = require('mongoose');

const kycdetailsSchema = new mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employeeentity'
      },
  panNumber: { type: String, required: true },
  aadhaarNumber: { type: String, required: true },
  esiNumber: { type: String , required: true},
  pfNumber: { type: String , required: true},
  // Other statutory details fields...
});

const kycdetails =mongoose.model('kycdetails', kycdetailsSchema,'kycdetails');
module.exports = kycdetails;
