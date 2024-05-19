const express = require("express")
const router = express.Router();
const {addBill, editBill, getAllBill, deleteBill, getBillById, searchMenu, searchDate} = require('../Controller/summary.controller')

//router
router.post("/addBill", addBill);
router.put("/editBill", editBill);
router.delete("/deleteBill", deleteBill);
router.get("/getAllBill", getAllBill);
router.get("/getBillById/:id", getBillById);
router.get("/searchMenu/:name", searchMenu);
router.get("/searchDate/:date", searchDate);

module.exports = router;
