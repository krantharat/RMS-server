const express = require('express');
const stockController = require("../Controller/stock.controller")

const router = express.Router()

router.get("/", (req, res) => {
    res.send({
        message: "this is stock router",
    });
});

router.post("/createIngredient", stockController.createIngredient);

router.get("/allIngredient", stockController.allIngredient);

router.get("/searchIngredient", stockController.searchIngredient);

router.get("/searchIngredientByDate", stockController.searchIngredientByDate);

router.put("/editIngredient/:id", stockController.editIngredient);

router.delete('/deleteIngredient/:id', stockController.deleteIngredient);

router.put("/updateIngredient/:id", stockController.updateIngredient);

module.exports = router;