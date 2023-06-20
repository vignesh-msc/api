const docSchema = new mongoose.Schema({
    docname: String,
    originalname: String,
    path: String,
  });
  
  const documents = mongoose.model('documents', docSchema,'documents');
  module.exports = documents;