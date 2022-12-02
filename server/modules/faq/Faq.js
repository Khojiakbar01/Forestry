const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");

const Faq = sequelize.define(
  "faq",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    questionUz: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    questionRu: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    questionEn: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    answerUz: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answerRu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answerEn: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

module.exports = Faq;
