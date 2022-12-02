const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");

const Statistics = sequelize.define(
  "statistics",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nameUz: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    nameRu: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    nameEn: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

module.exports = Statistics;
