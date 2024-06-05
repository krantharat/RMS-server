const mongoose = require('mongoose');

// Menu Category Schema
const MenuCategory = new mongoose.Schema({
    menuCategoryName: {
        type: String,
        required: true
    },
});

const MenuCategoryModel = mongoose.model('MenuCategory',MenuCategory) 
module.exports = MenuCategoryModel;


//Menu Schema
const Menu = new mongoose.Schema({
    menuName: {
        type: String,
        required: true
    },
    menuCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"MenuCategory",
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
      // required: true,
    },
});

const MenuModel = mongoose.model('Menu',Menu) 
module.exports = MenuModel;


