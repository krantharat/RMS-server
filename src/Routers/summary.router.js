const express = require("express")
const router = express.Router();
const {addBill} = require('../Controller/summary.controller')

router.post("/addBill",addBill);
module.exports = router;
