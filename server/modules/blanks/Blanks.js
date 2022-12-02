const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");
const Attachments = require("../attachment/Attachment");

const Blanks = sequelize.define(
  "blanks",
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
    descriptionUz: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descriptionRu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descriptionEn: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

Attachments.hasOne(Blanks, { foreignKey: "attachmentId", onDelete: "cascade" });
Blanks.belongsTo(Attachments, { as: "attachment" });

module.exports = Blanks;
