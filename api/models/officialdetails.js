const mongoose = require('mongoose');



const officialDetails =  mongoose.Schema({
   
  department: { type: String, required: true },
  company: { type: String, required: true },
  employeestatus: { type: String, required: true },
  employeetype: { type: String, required: true },
  manager: { type: String, required: true },
  officelocation: { type: String, required: true },
  worklocation: { type: String, required: true },
  dateofjoining: {type:Date, required: true },
  designation: { type: String, required: true },
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employeeentity'
  }
  // Other official details fields...
},{ strictPopulate: false });
const officialdetails = mongoose.model('officialdetails', officialDetails,'officialdetails');
module.exports = officialdetails;
