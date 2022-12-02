const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");

const Polls = sequelize.define(
  "poll",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    questionUz: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    questionRu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    questionEn: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

module.exports = Polls;

// "questionUz": "Yangi saytimiz haqida fikringiz qanday:",
// "questionRu": "Что вы думаете о нашем новом сайте:",
// "questionEn": "What do you think of our new site:",
// "answersUz": "A'lo,Yaxshi,Qoniqarli,Qoniqarsiz",
// "answersRu": "Отлично, Хорошо, Удовлетворительно, Неудовлетворительно",
// "answersEn": "Excellent, Good, Satisfactory, Unsatisfied"
