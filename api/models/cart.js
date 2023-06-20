const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cartitem',
      required: true
    }]
  },{ strictPopulate: false });
  const cart = mongoose.model('cart', cartSchema, 'cart');
  module.exports = {
    cart: cart
  };