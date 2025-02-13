"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Adoption extends Model {
    static associate(models) {
      Adoption.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  Adoption.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isVaccinated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mainImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subImages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      isPurchased: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Adoption",
      tableName: "Adoption",
    }
  );

  return Adoption;
};
