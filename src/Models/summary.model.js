const mongoose = require('mongoose');

const Summary = new mongoose.Schema({

    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuCategory",
        require: true
    },
    date: {
        type: String,
        require: true,
        default: Date.now
    },
    qty: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    cost: {
        type: Number,
        require: true
    },
    amount: {
        type: Number,
        require: true
    }
});

const SummaryModel = mongoose.model('bill',Summary)

module.exports = SummaryModel;