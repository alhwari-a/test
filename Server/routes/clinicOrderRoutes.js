const express = require("express");
const router = express.Router();
const { createClinicOrder } = require("../controllers/clinicOrderController");

router.post("/clinic-orders", createClinicOrder);

module.exports = router;
