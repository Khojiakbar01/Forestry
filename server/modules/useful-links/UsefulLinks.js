const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");
const Attachments = require("../attachment/Attachment");

const VirtualReception = sequelize.define(
  "virtualReception",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

Attachments.hasOne(VirtualReception, {
  foreignKey: "imgId",
  onDelete: "cascade",
});
VirtualReception.belongsTo(Attachments, { as: "img" });

module.exports = VirtualReception;
