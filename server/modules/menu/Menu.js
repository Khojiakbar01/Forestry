const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");

const Menu = sequelize.define(
  "menu",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nameRu: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nameUz: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nameEn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    underscored: true,
  }
);

Menu.hasMany(Menu, { foreignKey: "parentId" });
Menu.belongsTo(Menu, { as: "parent" });

module.exports = Menu;
