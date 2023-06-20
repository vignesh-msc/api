const mongoose = require('mongoose');

const bankDetailsSchema =  mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employeeentity'
      },
  accountNumber: { type: String, required: true },
  bankName: { type: String, required: true },
  branch: { type: String, required: true },
  ifsccode: { type: String, required: true }
  // Other bank details fields...
},{ strictPopulate: false });
const bankdetails = mongoose.model('bankdetails', bankDetailsSchema,'bankdetails');
module.exports = bankdetails;