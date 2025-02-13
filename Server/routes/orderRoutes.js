const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/OrderController");

const verifyToken = require("../middlewares/auth");

router.post("/orders", verifyToken, createOrder);

module.exports = router;
