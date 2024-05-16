const express = require("express")
const router = express.Router();
const {addSchedule} = require('../Controller/schedule/addschedule')

//main page?
router.get("/", (req, res) => {
    res.send({
        message: "this is admin router",
    });
});

router.post("/schedule/addschedule",addSchedule);

module.exports = router;