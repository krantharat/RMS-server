const mongoose = require('mongoose');

// Menu Schema
const MenuSchema = new mongoose.Schema({
  menuName: {
    type: String,
    required: true,
    unique: true
  },
  menuCategory: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
});

const MenuModel = mongoose.model('Menu', MenuSchema);
module.exports = MenuModel;
