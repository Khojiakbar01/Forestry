const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");

const Attachment = sequelize.define(
  "attachment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPermanent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    underscored: true,
  }
);

module.exports = Attachment;
