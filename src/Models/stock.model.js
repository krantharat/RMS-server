const mongoose = require('mongoose');

// Ingredient Schema
const Ingredient = new mongoose.Schema({
    ingredientName: {
        type: String,
        // required: true
    },
    ingredientCategory: {
        type: String,
        // required: true
    },
    date: {
        type: String,
        require: false,
        default: Date.now
    },
    inStock: {
        type: Number,
        // require: false,
        default: 0
    },
    uomType: {
        type: String,
        // required: true
    },
    cost: {
        type: Number,
        // require: true,
    },
    notiAmount: {
        type: Number,
        // require:true,
    }
});

const IngredientModel = mongoose.model('Ingredient',Ingredient) 
module.exports = IngredientModel;