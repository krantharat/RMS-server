const express = require("express")
const router = express.Router();
const {addBill, editBill, getAllBill, deleteBill, getBillByNumber, searchMenu, searchDate} = require('../Controller/summary.controller')

//router
router.post("/addBill", addBill);
router.put("/editBill/:billNumber", editBill);
router.delete("/deleteBill/:billNumber", deleteBill);
router.get("/getAllBill", getAllBill);
router.get("/getBillByNumber/:billNumber", getBillByNumber);
router.get("/searchMenu/:name", searchMenu);
router.get("/searchDate/:date", searchDate);

module.exports = router;
