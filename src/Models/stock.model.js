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