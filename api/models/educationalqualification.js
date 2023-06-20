const mongoose = require('mongoose');

const educationalQualificationSchema =  mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employeeentity'
      },
  degree: { type: String },
  institution: { type: String },
  year: { type: Number }
 
  // Other educational qualification fields...
} ,{ strictPopulate: false });
const educationalqualification = mongoose.model('educationalqualification', educationalQualificationSchema,'educationalqualification');
module.exports = educationalqualification;
