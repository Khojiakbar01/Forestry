const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");

const MetaInfo = sequelize.define(
  "metaInfo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    workingHoursUz: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    workingHoursRu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    workingHoursEn: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hotlines: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminstrationPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telegramLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instagramLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    facebookLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mapLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

module.exports = MetaInfo;
