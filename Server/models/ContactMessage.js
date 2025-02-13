"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ContactMessage extends Model {
    static associate(models) {}
  }

  ContactMessage.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ContactMessage",
      tableName: "ContactMessages",
      timestamps: true,
    }
  );

  return ContactMessage;
};
