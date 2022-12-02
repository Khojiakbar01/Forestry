const { validationResult } = require("express-validator");
const Polls = require("./Polls");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");
const PollAnswers = require("../poll-answers/PollAnswers");

exports.getAllPolls = catchAsync(async (req, res) => {
  const lang =
    req.params.lang.charAt(0).toUpperCase() + req.params.lang.slice(1);
  allPolls = await Polls.findAll({
    attributes: ["id", `question${lang}`],
    include: [
      {
        attributes: [`answer${lang}`],
        model: PollAnswers,
        as: "answers",
      },
    ],
  });
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      allPolls,
    },
  });
});

exports.createPoll = catchAsync(async (req, res, next) => {
  const lang =
    req.params.lang.charAt(0).toUpperCase() + req.params.lang.slice(1);
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const newPoll = await Polls.create(req.body);
  let answers = req.body.answers;
  answers.map((e) => (e.pollId = newPoll.id));
  const newPollAnswers = await PollAnswers.bulkCreate(answers);
  const newPollWithAnswers = await Polls.findAll({
    where: { id: { [Op.eq]: newPoll.id } },
    attributes: ["id", `question${lang}`],
    include: [
      {
        attributes: [`answer${lang}`],
        model: PollAnswers,
        as: "answers",
      },
    ],
  });
  res.status(201).json({
    status: "success",
    message: "Created new Poll",
    error: null,
    data: {
      newPollWithAnswers,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const pollById = await Polls.findOne({
    where: { id: { [Op.eq]: id } },
    attributes: ["id", "questionUz", "questionRu", "questionEn"],
    include: [
      {
        attributes: ["id", "answerUz", "answerRu", "answerEn"],
        model: PollAnswers,
        as: "answers",
      },
    ],
  });

  if (!pollById) {
    return next(new AppError("Bunday Id li Poll topilmadi"), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      pollById,
    },
  });
});

exports.updatePoll = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;

  const answers = req.body.answers;
  const pollById = await Polls.findByPk(id);
  const answersByPollId = await PollAnswers.findAll({
    where: { pollId: { [Op.eq]: id } },
  });
  if (!pollById || !answersByPollId) {
    return next(new AppError("Bunday Id li Poll topilmadi"), 404);
  }
  await pollById.update(req.body);
  for (let i = 0; i < answers.length; i++) {
    const updateAnswer = answers[i];
    const pollAnswer = await PollAnswers.findByPk(updateAnswer.id);
    await pollAnswer.update(updateAnswer);
  }
  const updatedPoll = await Polls.findAll({
    where: { id: { [Op.eq]: id } },
    attributes: ["id", "questionUz", "questionRu", "questionEn"],
    include: [
      {
        attributes: ["answerUz", "answerRu", "answerEn"],
        model: PollAnswers,
        as: "answers",
      },
    ],
  });
  res.json({
    status: "success",
    message: "Poll's info edited",
    error: null,
    data: {
      updatedPoll,
    },
  });
});

exports.deletePoll = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const pollById = await Polls.findByPk(id);
  if (!pollById) {
    return next(new AppError("Bunday Id li Poll Center topilmadi", 404));
  }
  await pollById.destroy();
  res.status(201).json({
    status: "success",
    message: "Deleted Poll",
    error: null,
    data: null,
  });
});
