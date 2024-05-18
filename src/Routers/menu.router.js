const express = require('express');
const menuController = require("../Controller/menu.controller")

const router = express.Router()

router.get("/", (req, res) => {
    res.send({
        message: "this is menu router",
    });
});

router.post("/createCategory", menuController.createCategory);

router.post("/createMenu", menuController.createMenu);

router.get("/allMenu", menuController.allMenu);

router.get('/searchMenu/:id', menuController.searchMenu);

router.put('/editMenu/:id', menuController.editMenu);

router.delete('/deleteMenu/:id', menuController.deleteMenu);

// router.get("/allMenu", (req, res) => {
//     res.send({
//         message: "this is all menu router",
//     });
// });


module.exports = router;