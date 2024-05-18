const express = require('express');
const employeeController = require("../Controller/employee.controller")

const router = express.Router()

router.get("/", (req, res) => {
    res.send({
        message: "this is employee router",
    });
});

router.post("/createGender", employeeController.createGender);

router.post("/createPosition", employeeController.createPosition);

router.post("/createEmployee", employeeController.createEmployee);

router.get("/allEmployee", employeeController.allEmployee);

router.get('/searchEmployee/:id', employeeController.searchEmployee);

module.exports = router;