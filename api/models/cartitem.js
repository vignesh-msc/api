const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const cartitem = mongoose.model('cartitem', cartItemSchema, 'cartitem');

module.exports = {
  cartitem: cartitem
};
