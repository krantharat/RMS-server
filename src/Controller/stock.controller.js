const mongoose = require('mongoose');

// Uom part
const UomModel = require("../Models/stock.model")
const createUom = async (req, res) => {
    try {
        const uomData = req.body
        const uom = new UomModel({
            uomType: uomData.uomType,
        })
        await uom.save()

        res.json({
            message: 'add Uom complete',
            uom: uom
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    createUom
  };