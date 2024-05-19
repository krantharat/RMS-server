const express = require('express');
const stockController = require("../Controller/stock.controller")

const router = express.Router()

router.get("/", (req, res) => {
    res.send({
        message: "this is stock router",
    });
});

router.post("/createUom", stockController.createUom);

module.exports = router;