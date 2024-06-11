const express = require('express');
const employeeController = require("../Controller/employee.controller")

const router = express.Router()

router.get("/", (req, res) => {
    res.send({
        message: "this is employee router",
    });
});

router.post("/createEmployee", employeeController.createEmployee);

router.get("/allEmployee", employeeController.allEmployee);

router.get('/searchEmployee', employeeController.searchEmployee);

router.put('/editEmployee/:id', employeeController.editEmployee);

router.delete('/deleteEmployee/:id', employeeController.deleteEmployee);

router.get('/nextEmployeeID', employeeController.getNextEmployeeNumber);

module.exports = router;
