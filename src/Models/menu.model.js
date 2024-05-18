const mongoose = require('mongoose');

// Category Schema
const Category = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
});

const CategoryModel = mongoose.model('Category',Category) 
module.exports = CategoryModel;


// Menu Schema
const Menu = new mongoose.Schema({
    menuName: {
        type: String,
        required: true
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
    }
});

const MenuModel = mongoose.model('Menu',Menu) 
module.exports = MenuModel;


