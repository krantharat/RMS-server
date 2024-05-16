const express = require('express');
const userController = require("../Controller/createUser.controller")

const router = express.Router()

router.get("/", (req, res) => {
    res.send({
        message: "this is user router",
    });
});

router.post("/createUsers", userController.createUser);

module.exports = router;