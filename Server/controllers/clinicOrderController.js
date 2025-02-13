const { ClinicOrder } = require("../models");

const createClinicOrder = async (req, res) => {
  const {
    animal_type,
    description,
    phone_number,
    reservation_time,
    is_coming,
    need_driver = false,
    location = "",
    street = "",
    building_number = "",
    status = "pending",
  } = req.body;

  try {
    const clinicOrder = await ClinicOrder.create({
      animal_type,
      description,
      phone_number,
      reservation_time,
      is_coming,
      need_driver,
      location,
      street,
      building_number,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Clinic order created successfully",
      data: clinicOrder,
    });
  } catch (error) {
    console.error("Error creating clinic order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create clinic order",
      error: error.message,
    });
  }
};

module.exports = {
  createClinicOrder,
};
