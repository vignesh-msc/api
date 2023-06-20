
const express = require('express');
const app = express();
const cors = require('cors');
const dbName = 'employees';
bodyparser = require("body-parser"),
  mongoose = require("mongoose");
const userModel = require('./employee/models/employee');
const authRouter = require('./api/routes/auth');
const checkUserRole = require('./api/middleware/role');
const Department = require('./api/models/Department');
const documents = require('./api/models/document');
const empdetails=require('./api/models/employeeregistration');
const multer = require('multer');
const employee_controller = require('./api/employeecontroller/empcontroller');
const cart_controller = require('./api/shoppingcartcontroller/cartcontroller')
const employee_profile = require('./api/models/employeeentity');
const officialDetails = require('./api/models/officialdetails');
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');

});

// const MongoClient = require('mongodb').MongoClient;
// Middleware to parse request body as JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use('/auth', authRouter);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the folder where you want to store the uploaded files
    const uploadFolder = 'C:/Users/Vignesh Nagarajan/uploads';
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    // Set the filename for the uploaded file
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });





const url = 'mongodb+srv://nagarajanvignesh1:motivity123@cluster1.kkcftel.mongodb.net/employees?retryWrites=true&w=majority';
 mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Connected…')
  })
  .catch(err => console.log(err));
  //getEmployeeprofile
  app.post('/createmployee',employee_controller.createEmployee);
  app.post('/createcart',cart_controller.addItemToCart);
  app.get('/getcartdetails/:UserID',cart_controller.getallItems);
  app.get('/getemployeeprofile/:UserID',employee_controller.getEmployeeprofile);
app.get('/employees', async function (req, res) {
  try {
    const users = await userModel.find({}).populate('department');
    console.log('usersgetactive',users);
    return res.status(200).json(users)
  } catch (error) {
    console.log('error_line42',error)
    console.log(error);
  }
});
app.post('/addemployee', async function (req, res) {
  console.log('req123body',req.body);
  const document = req.body;

  try {

    const usersExist = await userModel.find({empcode:Number(req.body.empcode)});

    if(usersExist && usersExist.length>0){
       return res.status(409).json('Employee already exists');
    }
    else{
        const users = new userModel(req.body);
        await users.save()
        return res.status(200).json(users);
    }

  } catch (error) {
    console.log('error', error);
    return res.status(422).json(error);
  }
});
app.post('/addemployeedetails', async function (req, res) {
  const document = req.body;
  try {

    const empExist = await empdetails.find({empcode:Number(req.body.empcode)});
    if(empExist && empExist.length>0){
       return res.status(409).json('Employee already exists');
    }
    else{
        const employee = new empdetails(req.body);
        await employee.save()
        return res.status(200).json(employee);
    }

  } catch (error) {
    console.log('error', error);
    return res.status(422).json(error);
  }
}); 
app.put('/editemployee/:id', async function (req, res) {
  debugger;
  const document = req.body;
      const filter = { empcode: req.body.empcode };
      try {
        await userModel.updateOne(filter,req.body)
          .then(result => {
            console.log(result);
            return res.status(200).json(result);
          })
          .catch(error => {
            return res.status(error).json(error);
          });
      }
      catch(ex){
     }
}
)
app.put('/deleteemployee/:id', async function (req, res) {
  try {
    const filter = { empcode: req.body.empcode };
    await userModel.updateOne(filter,req.body)
      .then(result => {
        console.log(result);
        return res.status(200).json(result);
      })
      .catch(error => {
        return res.status(error).json(error);
      });
  }
  catch(ex){
 }

})
app.get('/api/admin/users', checkUserRole('admin'), (req, res) => {
  // Only users with the "admin" role can access this route
  // Fetch and return user data
});
app.get('/departments',async (req, res) => {
  try {
    const department = await Department.find({});
    console.log('departments_test',department);
    res.json(department);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});
app.post('/upload', upload.single('file'), async (req, res) => {
  // Create a new document in MongoDB for the uploaded file
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)
   

});
app.get('/doclist',async (req, res) => {
  try {
    const _Document = await documents.find({});
    console.log('document',_Document);
    res.json(_Document);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

app.get('/getprofiledetails',async (req, res) => {
  try {
    const _profile= await empdetails.findById(req.params.id);
    res.json(_profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});



