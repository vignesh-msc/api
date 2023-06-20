const mongoose = require('mongoose');

const empfileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    filePath: { type: String, required: true },
    empId: { type: mongoose.Schema.Types.ObjectId, ref: 'employee'}, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},{strictPopulate: false },);
const empfiles= mongoose.model("empfiles", empfileSchema,"empfiles");
module.exports = empfiles;