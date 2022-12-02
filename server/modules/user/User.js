const { DataTypes } = require("sequelize");
const { hash } = require("bcrypt");
const sequelize = require("../../core/config/db/db");
const roles = require("../../core/constants/userRole");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [5],
          msg: " At least 5 characters !! ",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: " At least 6 characters !! ",
        },
      },
    },
    role: {
      type: DataTypes.ENUM(Object.values(roles)),
      allowNull: false,
      defaultValue: roles.ROLE_SUPER_ADMIN,
    },
  },
  {
    underscored: true,
    hooks: {
      async beforeCreate(user) {
        user.password = await hash(user.password, 8);
      },
    },
  }
);

module.exports = User;
