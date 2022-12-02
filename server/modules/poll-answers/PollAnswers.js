const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");
const Polls = require("../polls/Polls");

const PollAnswers = sequelize.define(
  "pollAnswers",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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

Polls.hasMany(PollAnswers, {
  foreignKey: "pollId",
  as: "answers",
  onDelete: "cascade",
});
PollAnswers.belongsTo(Polls, { as: "poll" });

module.exports = PollAnswers;
