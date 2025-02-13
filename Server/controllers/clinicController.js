const { Clinic } = require("../models");

const addClinic = async (req, res) => {
  try {
    const clinicData = req.body;
    const newClinic = await Clinic.create(clinicData);
    res.status(201).json({ success: true, data: newClinic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.findAll();
    res.status(200).json({ success: true, data: clinics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getClinicById = async (req, res) => {
  try {
    const clinicId = req.params.id;
    const clinic = await Clinic.findByPk(clinicId);
    if (!clinic) {
      return res
        .status(404)
        .json({ success: false, message: "Clinic not found" });
    }
    res.status(200).json({ success: true, data: clinic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateClinic = async (req, res) => {
  try {
    const clinicId = req.params.id;
    const updateData = req.body;

    const clinic = await Clinic.findByPk(clinicId);
    if (!clinic) {
      return res
        .status(404)
        .json({ success: false, message: "Clinic not found" });
    }

    await clinic.update(updateData);
    res.status(200).json({ success: true, data: clinic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getClinicWorkingHours = async (req, res) => {
  try {
    const clinicId = req.params.id;
    const clinic = await Clinic.findByPk(clinicId, {
      attributes: ["workingHours"],
    });

    if (!clinic) {
      return res
        .status(404)
        .json({ success: false, message: "Clinic not found" });
    }

    res.status(200).json({ success: true, data: clinic.workingHours });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addClinic,
  getAllClinics,
  getClinicById,
  updateClinic,
  getClinicWorkingHours,
};
