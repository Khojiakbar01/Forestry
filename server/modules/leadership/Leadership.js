const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");
const Attachments = require("../attachment/Attachment");

const Leadership = sequelize.define(
  "leadership",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    positionUz: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    positionRu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    positionEn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admissionDaysUz: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admissionDaysRu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admissionDaysEn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biographyUz: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biographyRu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biographyEn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isLeadership: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    underscored: true,
  }
);

Attachments.hasOne(Leadership, { foreignKey: "avatarId", onDelete: "cascade" });
Leadership.belongsTo(Attachments, { as: "avatar" });

module.exports = Leadership;
