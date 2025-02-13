// AdoptionRoutes.js
const express = require("express");
const verifyToken = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const {
  createAdoption,
  getAllAdoptions,
  updateAdoption,
  deleteAdoption,
  getAdoptionById,
  getAdoptionsByCategory,
  getAdoptionsByStatus,
} = require("../controllers/adoptionController");

const router = express.Router();

router.post(
  "/Adoptions-create",
  verifyToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 4 },
  ]),
  createAdoption
);
router.get("/all-Adoptions", getAllAdoptions);
router.put(
  "/Adoptions-edit/",
  verifyToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 5 },
  ]),
  updateAdoption
);

router.get("/Adoptions/:id", getAdoptionById);

router.get("/adoptions/category/:category", getAdoptionsByCategory);

router.delete("/Adoptions-delete", verifyToken, deleteAdoption);

router.get("/adoptions/status/approved", getAdoptionsByStatus);

module.exports = router;
