"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ClinicOrder extends Model {
    static associate(models) {}
  }

  ClinicOrder.init(
    {
      animal_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reservation_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      is_coming: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      need_driver: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      building_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "ClinicOrder",
      tableName: "ClinicOrders",
    }
  );

  return ClinicOrder;
};
