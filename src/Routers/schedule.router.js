const express = require("express")
const router = express.Router();
const { addShift, editShift, getShiftForWeek, getAllShift, getShiftById, deleteShift } = require('../Controller/schedule.controller')

//router
router.post("/addShift", addShift);
router.put("/editShift/:id", editShift);
router.get("/getDate", getShiftForWeek);
router.get("/getAllShift", getAllShift);
router.get('/getShiftById/:id', getShiftById);
router.delete("/deleteShift/:id", deleteShift);


module.exports = router;