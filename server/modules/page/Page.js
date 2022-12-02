const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");
const Menu = require("../menu/Menu");

const Page = sequelize.define(
  "page",
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
    contentUz: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contentEn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contentRu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

Menu.hasOne(Page, { foreignKey: "menuId" });
Page.belongsTo(Menu, { as: "menu" });

module.exports = Page;
