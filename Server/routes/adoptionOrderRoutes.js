const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const {
  createAdoptionOrder,
} = require("../controllers/adoptionOrderController");

router.post("/create/adoption-orders", verifyToken, createAdoptionOrder);

module.exports = router;
