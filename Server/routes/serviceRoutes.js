// serviceRoutes.js
const express = require("express");
const verifyToken = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const {
  createService,
  getAllServices,
  updateService,
  deleteService,
  getServiceById,
} = require("../controllers/serviceController");

const router = express.Router();

router.post(
  "/services-create",
  verifyToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 4 },
  ]),
  createService
);
router.get("/all-services", getAllServices);
router.put(
  "/services-edit/:id",
  verifyToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 5 },
  ]),
  updateService
);

router.get("/services/:id", getServiceById);

router.delete("/services-delete/:id", verifyToken, deleteService);
module.exports = router;
