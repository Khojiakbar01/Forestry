const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");
const genderTypes = require("../../core/constants/applicantsGenderTypes");
const appealStatusTypes = require("../../core/constants/appealStatusTypes");
const AppError = require("../../core/utils/AppError");
const Attachments = require("../attachment/Attachment");

const Applicants = sequelize.define(
  "applicant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM(Object.values(genderTypes)),
      allowNull: false,
    },
    passportInformations: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkPassport(value) {
          if (!/[A-Z]{2}[0-9]{7}/.test(value)) {
            throw new AppError("Provide a valid passport!", 400);
          }
        },
      },
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appealAnswer: {
      type: DataTypes.TEXT,
      defaultValueL: null,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appealText: {
      type: DataTypes.TEXT,
    },
    appealCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    appealStatus: {
      type: DataTypes.ENUM(Object.values(appealStatusTypes)),
      allowNull: false,
      defaultValue: appealStatusTypes.APPEAL_STATUS_TYPE_NEW,
    },
  },
  {
    underscored: true,
  }
);

Attachments.hasOne(Applicants, {
  foreignKey: "answerFileId",
  onDelete: "cascade",
});
Applicants.belongsTo(Attachments, { as: "answerFile" });

module.exports = Applicants;
