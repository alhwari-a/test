"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Contacts", [
      {
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        phone_number: "+1234567890",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Contacts", null, {});
  },
};
