"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    static associate(models) {
      Services.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  Services.init(
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
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
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      subImages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
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
      modelName: "Services",
      tableName: "Services",
    }
  );

  return Services;
};
