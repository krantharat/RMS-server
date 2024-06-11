const mongoose = require('mongoose');

//Menu Schema
const Menu = new mongoose.Schema({
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
    file: {
      type: String,
      required: true,
    },
});

const MenuModel = mongoose.model('Menu',Menu) 
module.exports = MenuModel;


