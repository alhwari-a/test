"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Clinics", [
      {
        name: "Healthy Life Clinic",
        location: "123 Wellness St, Health City, HC 12345",
        phoneNumber: "+1-123-456-7890",
        email: "info@healthylifeclinic.com",
        workingHours: JSON.stringify({
          monday: "9:00 AM - 5:00 PM",
          tuesday: "9:00 AM - 5:00 PM",
          wednesday: "9:00 AM - 5:00 PM",
          thursday: "9:00 AM - 5:00 PM",
          friday: "9:00 AM - 5:00 PM",
          saturday: "10:00 AM - 2:00 PM",
          sunday: "Closed",
        }),
        holidays: Sequelize.literal(
          `ARRAY['2023-12-25T00:00:00.000Z', '2024-01-01T00:00:00.000Z']::timestamptz[]`
        ), // Explicitly cast to timestamptz[]
        openDays: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ],
        closedDays: ["sunday"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Clinics", null, {});
  },
};
