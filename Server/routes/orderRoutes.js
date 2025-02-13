const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/OrderController");

const verifyToken = require("../middlewares/auth");

router.post("/orders", verifyToken, createOrder);

router.get("/all-orders", getAllOrders);

router.put("/orders/:orderId/status", updateOrderStatus);

module.exports = router;
