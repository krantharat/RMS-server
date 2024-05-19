const express = require("express")
const router = express.Router();
const { addShift, editShift, getShiftForWeek } = require('../Controller/schedule.controller')

//router
// router.post("/addPosition", addPosition);
router.post("/addShift", addShift);
router.put("/editShift/:id", editShift);
router.get("/getDate", getShiftForWeek);


module.exports = router;