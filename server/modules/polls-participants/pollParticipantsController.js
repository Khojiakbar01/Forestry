const { validationResult } = require("express-validator");
const Polls = require("../polls/Polls");
const PollParcipants = require("../polls-participants/PollParticipants");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op, sequelize } = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");

exports.createPollParticipant = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const pollId = req.params.id;
  const existedPollParcipant = await PollParcipants.findOne({
    where: { sessionId: { [Op.eq]: req.body.sessionId } },
  });

  if (existedPollParcipant) {
    await existedPollParcipant.update(req.body);
  } else {
    const newPollParcipants = await PollParcipants.create({
      ...req.body,
      pollId,
    });
  }

  const resPoll = await PollParcipants.count({
    attributes: ["answer_id"],
    group: "answer_id",
    where: { pollId: { [Op.eq]: pollId } },
  });
  res.status(201).json({
    status: "success",
    message: "Successfully voted",
    error: null,
    data: {
      resPoll,
    },
  });
});
