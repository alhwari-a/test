const { User } = require("../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: "user",
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
};

const getUserCount = async (req, res) => {
  try {
    const count = await User.count();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user count" });
  }
};

module.exports = {
  getAllUsers,
  getUserCount,
};
