const { validationResult } = require("express-validator");
const Blanks = require("./Blanks");
const Attachment = require("../attachment/Attachment");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");

exports.getAllBlanks = catchAsync(async (req, res) => {
  const lang =
    req.params.lang.charAt(0).toUpperCase() + req.params.lang.slice(1);
  let reqQuery = { ...req.query };
  reqQuery.fields = `id,title${lang},description${lang},attachmentId`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  let allBlanks = await Blanks.findAndCountAll(queryBuilder.queryOptions);
  allBlanks = queryBuilder.createPage(allBlanks);
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      allBlanks,
    },
  });
});

exports.createBlank = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const attachmentById = await Attachment.findByPk(req.body.attachmentId);
  if (!attachmentById) {
    return next(new AppError("Bunday Id li attachment topilmadi"), 404);
  }
  const newBlank = await Blanks.create(req.body);
  if (newBlank) {
    attachmentById.update({ isPermanent: true });
  }

  res.status(201).json({
    status: "success",
    message: "Created new Blanks",
    error: null,
    data: {
      newBlank,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const blankById = await Blanks.findByPk(id);

  if (!blankById) {
    return next(new AppError("Bunday Id li Blanks topilmadi"), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      blankById,
    },
  });
});

exports.updateBlank = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const blankById = await Blanks.findByPk(id);
  if (!blankById) {
    return next(new AppError("Bunday Id li Blank topilmadi"), 404);
  }
  const updatedBlank = await blankById.update(req.body);
  res.json({
    status: "success",
    message: "Blank's info edited",
    error: null,
    data: {
      updatedBlank,
    },
  });
});

exports.deleteBlank = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const blankById = await Blanks.findByPk(id);
  if (!blankById) {
    return next(new AppError("Bunday Id li Blank topilmadi", 404));
  }
  const attachmentById = await Attachment.findByPk(blankById.attachmentId);
  await blankById.destroy();
  await attachmentById.destroy();
  res.status(201).json({
    status: "success",
    message: "Deleted Blank",
    error: null,
    data: null,
  });
});
