const mongoose = require('mongoose');

// Define the Mongoose schema for the employee class
const userModel =  mongoose.Schema({
  empcode: { type: Number, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  employementType: { type: String, required: true },
  contactdetails: { type: String, required: true },
  hireDate: {type:Date, required: true },
  jobtitle: { type: String, required: true },
  departmentname: { type: String, required: true },
  emergencycontactdetails : { type: String, required: true },
  isActive:{type:Boolean,required:true},
  deptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{ strictPopulate: false });
module.exports = mongoose.model("employeedetails", userModel,"employeedetails");