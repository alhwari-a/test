"use strict";

module.exports = (sequelize, DataTypes) => {
  const AdoptionOrder = sequelize.define(
    "AdoptionOrder",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      adoption_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Adoption",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
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
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      tableName: "adoption_orders",
      timestamps: true,
      underscored: true,
    }
  );

  AdoptionOrder.associate = (models) => {
    AdoptionOrder.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    AdoptionOrder.belongsTo(models.Adoption, {
      foreignKey: "adoption_id",
      as: "adoption",
    });
  };

  return AdoptionOrder;
};
