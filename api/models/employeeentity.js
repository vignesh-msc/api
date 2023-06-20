const mongoose = require('mongoose');



// Define the Mongoose schema for the employee class
const employeeModel =  mongoose.Schema({
  empcode: { type: String, required: true },
  isActive:{ type:Boolean,required:true},
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{ strictPopulate: false });

const employeeentity = mongoose.model('employeeentity', employeeModel,'employeeentity');
module.exports = employeeentity;
