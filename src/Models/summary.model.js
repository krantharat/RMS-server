const mongoose = require('mongoose');
const CounterModel = require('./counter.model');

const Summary = new mongoose.Schema({

    billNumber: {
        type: String,
        unique: true,
        require: true
    },
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
        unique: true,
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

Summary.pre('save', async function(next) {
    const summary = this;
    if (!summary.isNew) {   
      return next();
    }
  
    try {
      const counter = await CounterModel.findByIdAndUpdate(
        { _id: 'billNumber' },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      summary.billNumber = counter.sequenceValue;
      next();
    } catch (error) {
      next(error);
    }
  });

const SummaryModel = mongoose.model('bill',Summary)

module.exports = SummaryModel;

