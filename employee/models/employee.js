const mongoose = require('mongoose');

// Define the Mongoose schema for the employee class
const userModel =  mongoose.Schema({
  empcode: { type: Number, required: true },
  empname: { type: String, required: true },
  departmentname: { type: String, required: true },
  isActive:{type:Boolean,required:true},
  deptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department'
  }
},{ strictPopulate: false });
module.exports = mongoose.model("employee", userModel,"employee");

// Define the Mongoose schema for the employee class
