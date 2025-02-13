const { sequelize, AdoptionOrder, Adoption } = require("../models");

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

module.exports = {
  createAdoptionOrder,
};
