const express = require('express');
const menuController = require("../Controller/menu.controller")

const router = express.Router()

router.get("/", (req, res) => {
    res.send({
        message: "this is menu router",
    });
});

router.post("/createMenuCategory", menuController.createMenuCategory);

router.post("/createMenu", menuController.createMenu);

router.get("/allMenu", menuController.allMenu);

router.get('/searchMenu', menuController.searchMenu);

router.put('/editMenu/:id', menuController.editMenu);

router.delete('/deleteMenu/:id', menuController.deleteMenu);

module.exports = router;