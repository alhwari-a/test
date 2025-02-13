"use strict";
const { Adoption, User } = require("../models");
const nodemailer = require("nodemailer");

const createAdoption = async (req, res) => {
  try {
    const { name, type, isVaccinated, category, description, phoneNumber } =
      req.body;
    const userId = req.userId;

    if (
      !req.files ||
      !req.files.mainImage ||
      req.files.mainImage.length === 0
    ) {
      return res.status(400).json({ message: "Main image is required." });
    }

    const mainImage = req.files.mainImage[0].path;
    const subImages = req.files.subImages
      ? req.files.subImages.map((file) => file.path)
      : [];

    const newAdoption = await Adoption.create({
      userId,
      name,
      type,
      isVaccinated: isVaccinated === "true",
      category,
      description,
      phoneNumber,
      mainImage,
      subImages,
      status: "pending",
    });

    res.status(201).json({
      message: "Adoption created successfully",
      Adoption: newAdoption,
    });
  } catch (error) {
    console.error("Adoption creation error:", error);
    res
      .status(500)
      .json({ message: "Error creating Adoption", error: error.message });
  }
};

const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.findAll({
      where: {
        isPurchased: false,
      },
    });

    if (adoptions.length === 0) {
      return res.status(404).json({ message: "No available adoptions found." });
    }

    res.status(200).json(adoptions);
  } catch (error) {
    console.error("Error retrieving Adoption:", error);
    res.status(500).json({
      message: "Error retrieving Adoption",
      error: error.message,
    });
  }
};

const getApprovedAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.findAll({
      where: {
        status: "approved",
      },
      logging: console.log,
    });

    if (adoptions.length === 0) {
      return res.status(404).json({ message: "No approved adoptions found." });
    }

    res.status(200).json({
      message: "Approved adoptions retrieved successfully.",
      data: adoptions,
    });
  } catch (error) {
    console.error("Error retrieving approved adoptions:", error);
    res.status(500).json({
      message: "Error retrieving approved adoptions",
      error: error.message,
    });
  }
};

const getAdoptionById = async (req, res) => {
  const { id } = req.params;

  try {
    const adoption = await Adoption.findByPk(id);

    if (!adoption) {
      return res.status(404).json({ message: "Adoption not found." });
    }

    res.status(200).json(adoption);
  } catch (error) {
    console.error("Error retrieving Adoption by ID:", error);
    res
      .status(500)
      .json({ message: "Error retrieving Adoption", error: error.message });
  }
};

const updateAdoption = async (req, res) => {
  try {
    const { id, name, type, isVaccinated, category, description, phoneNumber } =
      req.body;
    const userId = req.userId;

    const adoption = await Adoption.findOne({
      where: { id, userId },
    });

    if (!adoption) {
      return res.status(404).json({ message: "Adoption not found" });
    }

    if (name) adoption.name = name;
    if (type) adoption.type = type;
    if (isVaccinated !== undefined)
      adoption.isVaccinated = isVaccinated === "true";
    if (category) adoption.category = category;
    if (description) adoption.description = description;
    if (phoneNumber) adoption.phoneNumber = phoneNumber;

    if (req.files && req.files.mainImage) {
      adoption.mainImage = req.files.mainImage[0].path;
    }

    if (req.files && req.files.subImages) {
      adoption.subImages = req.files.subImages.map((file) => file.path);
    }

    await adoption.save();

    res.status(200).json({
      message: "Adoption updated successfully",
      adoption,
    });
  } catch (error) {
    console.error("Adoption update error:", error);
    res
      .status(500)
      .json({ message: "Error updating Adoption", error: error.message });
  }
};

const deleteAdoption = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.userId;

    if (!id) {
      return res.status(400).json({ message: "Adoption ID is required" });
    }

    const adoption = await Adoption.findOne({ where: { id, userId } });

    if (!adoption) {
      return res.status(404).json({ message: "Adoption not found" });
    }

    await adoption.destroy();
    res.status(200).json({ message: "Adoption deleted successfully" });
  } catch (error) {
    console.error("Adoption deletion error:", error);
    res
      .status(500)
      .json({ message: "Error deleting Adoption", error: error.message });
  }
};

const getAdoptionsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const adoptions = await Adoption.findAll({
      where: {
        category,
        status: "approved",
        isPurchased: false,
      },
    });

    if (adoptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No approved adoptions found for this category." });
    }

    res.status(200).json(adoptions);
  } catch (error) {
    console.error("Error retrieving approved adoptions by category:", error);
    res.status(500).json({
      message: "Error retrieving approved adoptions",
      error: error.message,
    });
  }
};

const getAdoptionsByStatus = async (req, res) => {
  try {
    const adoptions = await Adoption.findAll({ where: { status: "approved" } });

    if (adoptions.length === 0) {
      return res.status(404).json({ message: "No approved Adoptions found." });
    }

    res.status(200).json(adoptions);
  } catch (error) {
    console.error("Error retrieving approved Adoptions:", error);
    res.status(500).json({
      message: "Error retrieving approved Adoptions",
      error: error.message,
    });
  }
};

const updateAdoptionStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    console.log(`Adoption ID from request: ${id}`);

    const validStatuses = ["approved", "pending", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const adoption = await Adoption.findOne({
      where: { id },
    });

    if (!adoption) {
      console.log(`No adoption found`);
      return res.status(404).json({ message: "Adoption not found" });
    }

    adoption.status = status;

    const userId = adoption.userId;

    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      console.log(`User not found`);
      return res.status(404).json({ message: "User not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "orgpurrrfectmatch@gmail.com",
        pass: "zpnc uigd zipi xgqe",
      },
    });

    const emailSubject =
      status === "approved" ? "Adoption Approved" : "Adoption Rejected";
    const emailText =
      status === "approved"
        ? "Congratulations! Your adoption request has been approved."
        : "We regret to inform you that your adoption request has been rejected.";

    const mailOptions = {
      from: "orgpurrrfectmatch@gmail.com",
      to: user.email,
      subject: emailSubject,
      text: emailText,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent: " + info.response);
    });

    await adoption.save();

    res.status(200).json({
      message: "Adoption status updated successfully",
      adoption,
    });
  } catch (error) {
    console.error("Adoption status update error:", error);
    res.status(500).json({
      message: "Error updating Adoption status",
      error: error.message,
    });
  }
};

module.exports = {
  createAdoption,
  updateAdoption,
  getAllAdoptions,
  deleteAdoption,
  getAdoptionById,
  getAdoptionsByCategory,
  getAdoptionsByStatus,
  updateAdoptionStatus,
  getApprovedAdoptions,
};
