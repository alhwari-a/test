const express = require("express");
const router = express.Router();
const {
  createClinicOrder,
  getAllClinicOrders,
} = require("../controllers/clinicOrderController");

router.post("/clinic-orders", createClinicOrder);
router.get("/get-clinic-orders", getAllClinicOrders);

module.exports = router;
