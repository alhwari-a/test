require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: "1234",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};
