const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");

const Subscribers = sequelize.define(
  "subscribers",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

module.exports = Subscribers;
