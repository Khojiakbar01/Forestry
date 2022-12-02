const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");

const OpenData = sequelize.define(
  "openData",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titleUz: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titleRu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titleEn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

module.exports = OpenData;
