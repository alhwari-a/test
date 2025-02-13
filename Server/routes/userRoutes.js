"use strict";

const express = require("express");
const router = express.Router();
const { getAllUsers, getUserCount } = require("../controllers/userController");

router.get("/All-users", getAllUsers);

router.get("/users/count", getUserCount);

module.exports = router;
