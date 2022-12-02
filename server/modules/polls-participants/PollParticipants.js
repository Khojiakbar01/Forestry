const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");
const Polls = require("../polls/Polls");
const PollAnswers = require("../poll-answers/PollAnswers");

const PollParticipants = sequelize.define(
  "pollParticipants",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

Polls.hasMany(PollParticipants, { foreignKey: "pollId" });
PollParticipants.belongsTo(Polls, { as: "poll" });

PollAnswers.hasOne(PollParticipants, { foreignKey: "answerId" });
PollParticipants.belongsTo(PollAnswers, { as: "answer" });

module.exports = PollParticipants;
