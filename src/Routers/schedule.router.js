const express = require("express")
const router = express.Router();
const {addSchedule} = require('../Controller/schedule.controller')

router.get("/", (req, res) => {
    res.send({
        message: "this is admin router",
    });
});


router.post("/schedule/addSchedule",addSchedule);


module.exports = router;