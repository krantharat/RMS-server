const mongoose = require('mongoose');

// UOM Schema
const Uom = new mongoose.Schema({
    uomType: {
        type: String,
        required: true
    },
});

const UomModel = mongoose.model('Uom',Uom) 
module.exports = UomModel;

// Ingredient Category Schema
const IngredientCategory = new mongoose.Schema({
    ingredientCategoryName: {
        type: String,
        required: true
    },
});

const IngredientCategoryModel = mongoose.model('IngredientCategory',IngredientCategory) 
module.exports = IngredientCategoryModel;

// Ingredient Schema
const Ingredient = new mongoose.Schema({
    ingredientName: {
        type: String,
        required: true
    },
    ingredientCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"IngredientCategory",
        required: true
    },
    date: {
        type: String,
        require: false,
        default: Date.now
    },
    inStock: {
        type: Number,
        require: false,
        default: 0
    },
    uomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Uom",
        required: true
    },
    cost: {
        type: Number,
        require: true,
    }
});

const IngredientModel = mongoose.model('Ingredient',Ingredient) 
module.exports = IngredientModel;