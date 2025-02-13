"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    static associate(models) {
    }
  }

  Clinic.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      workingHours: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      holidays: {
        type: DataTypes.ARRAY(DataTypes.DATE),
        allowNull: true,
      },
      openDays: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      closedDays: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Clinic",
    }
  );

  return Clinic;
};