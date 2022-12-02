const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");

const RegionalOffices = sequelize.define(
  "regionalOffices",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    regionUz: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    regionRu: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    regionEn: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    principal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressUz: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    addressRu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    addressEn: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

module.exports = RegionalOffices;
