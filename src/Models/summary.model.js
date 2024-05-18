const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true
    },
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        require: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        require: true
    },
    date: {
        type: String,
        require: true
    },
    qty: {
        type: Number,
        require: true
    },
    price: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "",
        require: true
    },
    cost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "",
        require: true
    }
});

const Summary = mongoose.model('Summary',summarySchema)

module.exports = Summary;