const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  replies: [{
    content: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    subComments: [{
      content: String,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      // Add any other necessary fields
    }],
  }],
});

const Commentmodel = mongoose.model('comment', CommentSchema);

module.exports = Commentmodel;