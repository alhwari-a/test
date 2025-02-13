const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const {
  createAdoptionOrder,
  getAllAdoptionOrders,
  updateAdoptionOrderStatus,
} = require("../controllers/adoptionOrderController");

router.post("/create/adoption-orders", verifyToken, createAdoptionOrder);

router.get("/adoption-orders", getAllAdoptionOrders);

router.put("/adoption-orders/:orderId/status", updateAdoptionOrderStatus);

module.exports = router;
