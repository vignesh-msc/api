const mongoose = require('mongoose');

const stockItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // Other fields for the stock item
});

const StockItem = mongoose.model('stockitem', stockItemSchema,'stockitem');

module.exports = StockItem;