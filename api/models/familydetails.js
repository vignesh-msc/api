const mongoose = require('mongoose');

const familyDetailsSchema = mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employeeentity'
      },
  spouseName: { type: String },
  children: [{
    name: { type: String },
    age: { type: Number },
    // Other child details...
  }],
  // Other family details fields...
},{ strictPopulate: false });
const familydetails =mongoose.model('familydetails', familyDetailsSchema,'familydetails');
module.exports = familydetails;
