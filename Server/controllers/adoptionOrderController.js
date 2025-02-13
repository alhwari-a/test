const { sequelize, AdoptionOrder, Adoption, User } = require("../models");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "orgpurrrfectmatch@gmail.com",
    pass: "zpnc uigd zipi xgqe",
  },
});

const createAdoptionOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.userId;
    const { adoption_id, name, phone_number, email } = req.body;

    if (!adoption_id || !name || !phone_number || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newOrder = await AdoptionOrder.create(
      {
        user_id: userId,
        adoption_id,
        name,
        phone_number,
        email,
      },
      { transaction: t }
    );

    const adoption = await Adoption.findOne(
      { where: { id: adoption_id } },
      { transaction: t }
    );

    if (!adoption) {
      await t.rollback();
      return res.status(404).json({ message: "Adoption not found." });
    }

    console.log("Adoption found:", adoption);

    if (adoption.isPurchased) {
      await t.rollback();
      return res
        .status(400)
        .json({ message: "This adoption has already been purchased." });
    }

    console.log("Current isPurchased status:", adoption.isPurchased);

    const [updated] = await Adoption.update(
      { isPurchased: true },
      { where: { id: adoption_id }, transaction: t }
    );

    console.log("Rows affected by update:", updated);

    if (updated === 0) {
      await t.rollback();
      return res
        .status(404)
        .json({ message: "Adoption not found or already purchased." });
    }

    await t.commit();

    return res.status(201).json({
      message:
        "Adoption order created successfully and Adoption is marked as purchased.",
      adoptionOrder: newOrder,
    });
  } catch (error) {
    console.error("Error creating adoption order:", error);
    await t.rollback();
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllAdoptionOrders = async (req, res) => {
  try {
    const adoptionOrders = await AdoptionOrder.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email"],
        },
        { model: Adoption, as: "adoption" },
      ],
    });

    return res.status(200).json({ adoptionOrders });
  } catch (error) {
    console.error("Error fetching adoption orders:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateAdoptionOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    const adoptionOrder = await AdoptionOrder.findOne({
      where: { id: orderId },
      include: [
        { model: User, as: "user" },
        { model: Adoption, as: "adoption" },
      ],
    });

    if (!adoptionOrder) {
      return res.status(404).json({ message: "Adoption order not found." });
    }

    // Update the adoption order status
    await AdoptionOrder.update({ status }, { where: { id: orderId } });

    // If the status is 'rejected', update the associated adoption record
    if (status === "rejected" && adoptionOrder.adoption) {
      await Adoption.update(
        { isPurchased: false, status: "approved" },
        { where: { id: adoptionOrder.adoption.id } }
      );
    }

    // Send email notification
    const mailOptions = {
      from: "orgpurrrfectmatch@gmail.com",
      to: adoptionOrder.user.email,
      subject: "Adoption Order Status Updated",
      text: `Hello ${adoptionOrder.user.name},\n\nYour adoption order status has been updated to: ${status}.\n\nThank you for using our service!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return res.status(200).json({
      message:
        "Adoption order status updated successfully. Email sent to user.",
      updatedOrder: { id: orderId, status },
    });
  } catch (error) {
    console.error("Error updating adoption order status:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createAdoptionOrder,
  getAllAdoptionOrders,
  updateAdoptionOrderStatus,
};
