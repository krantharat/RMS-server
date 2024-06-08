const mongoose = require('mongoose');
const MenuModel = require('./menu.model'); 

const SummarySchema = new mongoose.Schema({
    billNumber: {
        type: String,
        // unique: true,
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique: true,
        default: Date.now
    },
    totalCosteEachBill: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    profit: {
        type: Number,
        required: false
    },
    saleTotal: {
        type: Number,
        required: false
    },
    totalCost: {
        type: Number,
        required: false
    },
    menuitem: [{
        menu: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu'
        },
        menuCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuCategory'
        },
        qty: {
            type: Number,
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
        amount: {
            type: Number,
            required: true
        }
    }]
});

const SummaryModel = mongoose.model('Summary', SummarySchema);
module.exports = SummaryModel;
