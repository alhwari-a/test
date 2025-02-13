const { Order } = require("../models");

const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { product_ids, status = "pending" } = req.body;

    if (!product_ids || product_ids.length === 0) {
      return res.status(400).json({ message: "Product IDs are required." });
    }

    const order = await Order.create({
      user_id: userId,
      product_ids,
      status,
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order", error);
    return res.status(500).json({ message: "Error creating order", error });
  }
};

module.exports = {
  createOrder,
};
