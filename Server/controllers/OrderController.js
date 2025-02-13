const { Op } = require("sequelize");
const { Order, User, Services } = require("../models");
const nodemailer = require("nodemailer");

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

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email"],
        },
      ],
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }

    for (const order of orders) {
      const productIds = order.product_ids;

      const products = await Services.findAll({
        where: {
          id: {
            [Op.in]: productIds,
          },
        },
        attributes: ["id", "title", "price", "mainImage"],
      });

      order.setDataValue("products", products);
    }

    const formattedOrders = orders.map((order) => {
      const { user, products, ...orderData } = order.dataValues;

      const formattedOrder = {
        orderId: orderData.id,
        userId: orderData.user_id,
        status: orderData.status,
        createdAt: new Date(orderData.created_at).toLocaleString(),
        updatedAt: new Date(orderData.updated_at).toLocaleString(),
        user: {
          name: user.name,
          email: user.email,
        },
        products: products.map((product) => ({
          productId: product.id,
          title: product.title,
          price: product.price.toFixed(2),
          image: product.mainImage,
        })),
      };

      return formattedOrder;
    });

    return res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders", error);
    return res.status(500).json({ message: "Error fetching orders", error });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    const order = await Order.findByPk(orderId, {
      include: {
        model: User,
        as: "user",
        attributes: ["name", "email"],
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.status = status;
    await order.save();

    const user = order.user;
    const emailSubject = `Your Order Status has been Updated`;
    const emailText = `Hello ${user.name},\n\nYour order status has been updated to "${status}".\n\nThank you for shopping with us.`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "orgpurrrfectmatch@gmail.com",
        pass: "zpnc uigd zipi xgqe",
      },
    });

    const mailOptions = {
      from: "orgpurrrfectmatch@gmail.com",
      to: user.email,
      subject: emailSubject,
      text: emailText,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Order status updated successfully and email sent to the user.",
      order,
    });
  } catch (error) {
    console.error("Error updating order status", error);
    return res
      .status(500)
      .json({ message: "Error updating order status", error });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
};
