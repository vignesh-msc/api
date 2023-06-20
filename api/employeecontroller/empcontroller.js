const employee = require('../models/employeeentity');
const educationqual = require('../models/educationalqualification');
const bankdetails = require('../models/bankdetails');
// const familydetails = require('../models/familydetails');
const officialdetails = require('../models/officialdetails');
const statutorydetails = require('../models/statutorydetails');
const kycdetails = require('../models/kycdetails');
const user = require('../models/User');

const createEmployee = async (req, res) => {
    try {
        const { employeeentity, edqualificationentity, bankdetailsenttity, officialdetailsentity,
            statutorydetailsentity } = req.body;
            const empExist = await employee.find({empcode:employeeentity.empcode});
    if(empExist && empExist.length>0){
       return res.status(409).json('Employee already exists');}
        const employee_create = await employee.create(employeeentity);
        edqualificationentity.empId = employee_create._id;
        bankdetailsenttity.empId = employee_create._id;
        // _familydetails.empId = employee._id;
        officialdetailsentity.empId = employee_create._id;
        statutorydetailsentity.empId = employee_create._id;
        officialdetailsentity.dateofjoining = new Date(officialdetailsentity.dateofjoining);
        const eduqual_create = await educationqual.create(edqualificationentity);
        const bankdetials_create = await bankdetails.create(bankdetailsenttity);
        // const familydetails_create = await familydetails.create(_familydetails);
        const officialdetails_create = await officialdetails.create(officialdetailsentity);
        const statutorydetails_create = await statutorydetails.create(statutorydetailsentity);
        // const kycdetails_create = await kycdetails.create(statutorydetailsentity);
        // employee_create.kycId = kycdetails_create._id;
        console.log('employeeentity.userId',employeeentity.userId);
        const userId =  new mongoose.Types.ObjectId(employeeentity.userId);
        //const userInfo = await user.findById(userId);
     //   user.findByIdAndUpdate(userId, { isprofile: true });
        const updateduser = await user.findByIdAndUpdate(userId, { isprofile: true })
          .then(updatedUser => {
            console.log("Updated User:", updatedUser);
          })
          .catch(error => {
            console.error("Error updating user:", error);
          });
          




        res.status(200).json({
            message: 'Employee details saved successfully',
            employee_create,
            eduqual_create,
            bankdetials_create,
            // familydetails_create,
            officialdetails_create,
            statutorydetails_create
        });

    }
    catch (error) {
        console.log(error);
       // res.status(500).json({ error: 'Failed to save employee details });
       res.status(500).json({ error: error.message, stack: error.stack });
    }

};
const getEmployeeprofile = async (req, res) => {
    mongoose.set('debug', true);
    try {
        const userId = req.params.UserID;
        const empobj = await employee.findOne({ userId: userId });
       const  OfficialDetails = await officialdetails.findOne({empId: empobj._id}).select('-_id');
       const bankDetails = await bankdetails.findOne({empId: empobj._id}).select('-_id');
       const educationalQualification = await educationqual.findOne({empId: empobj._id}).select('-_id');
       const statutoryDetails = await statutorydetails.findOne({empId: empobj._id}).select('-_id');
       
        res.status(200).json({
            message:'Retrieved Details sucessfully',
            OfficialDetails,
            bankDetails,
            educationalQualification,
            statutoryDetails
        });

        }
catch (error) {
    res.status(500).json({ message: 'Error retrieving profile', error: error.message });
}
}

function getEmployeesWithLocations(empcode) {
    return employee.findOne({empcode:empcode}).populate('statutorydetails').exec().then(employee => {
        // res.json(user); 
        console.log('user',employee);
  });
  }
module.exports = {
    createEmployee,
    getEmployeeprofile
  };

