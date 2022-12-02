const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");
const pressCenterTypes = require("../../core/constants/pressCenterTypes");
const Attachments = require("../attachment/Attachment");

const PressCenter = sequelize.define(
  "pressCenter",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    type: {
      type: DataTypes.ENUM(Object.values(pressCenterTypes)),
      allowNull: false,
    },
    titleUz: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    titleRu: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,

    },
    titleEn: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,

    },
    textUz: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    textRu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    textEn: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    viewersCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    underscored: true,
  }
);

Attachments.hasOne(PressCenter, { foreignKey: "bannerId", onDelete: "cascade" });
PressCenter.belongsTo(Attachments, { as: "banner" });

Attachments.hasOne(PressCenter, { foreignKey: "fileId", onDelete: "cascade" });
PressCenter.belongsTo(Attachments, { as: "file" });

module.exports = PressCenter;
