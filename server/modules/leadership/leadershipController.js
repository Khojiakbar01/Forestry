const { validationResult } = require("express-validator");
const Leadership = require("./Leadership");
const Attachment = require("../attachment/Attachment");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");

exports.getAllLeadership = catchAsync(async (req, res) => {
  const lang =
    req.params.lang.charAt(0).toUpperCase() + req.params.lang.slice(1);
  let reqQuery = { ...req.query };
  reqQuery.fields = `id,firstName,lastName,middleName,position${lang},admissionDays${lang},phoneNumber,fax,email,biography${lang},avatarId`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  let allLeaderships = await Leadership.findAndCountAll(
    queryBuilder.queryOptions
  );
  allLeaderships = queryBuilder.createPage(allLeaderships);
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      allLeaderships,
    },
  });
});

exports.createLeadership = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const attachmentById = await Attachment.findByPk(req.body.avatarId);
  if (!attachmentById) {
    return next(new AppError("Bunday Id li avatar topilmadi"), 404);
  }
  const newLeadership = await Leadership.create(req.body);
  if (newLeadership) {
    attachmentById.update({ isPermanent: true });
  }

  res.status(201).json({
    status: "success",
    message: "Created new leadership",
    error: null,
    data: {
      newLeadership,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const leadershipById = await Leadership.findByPk(id);

  if (!leadershipById) {
    return next(new AppError("Bunday Id li Leadership topilmadi"), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      leadershipById,
    },
  });
});

exports.updateLeadership = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const leadershipById = await Leadership.findByPk(id);
  if (!leadershipById) {
    return next(new AppError("Bunday Id li leadership topilmadi"), 404);
  }
  const updatedLeadership = await leadershipById.update(req.body);
  res.json({
    status: "success",
    message: "Leadership's info edited",
    error: null,
    data: {
      leadershipById,
    },
  });
});

exports.deleteLeadership = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const leadershipById = await Leadership.findByPk(id);
  if (!leadershipById) {
    return next(new AppError("Bunday Id li Leadership topilmadi", 404));
  }
  const attachmentById = await Attachment.findByPk(galleryItemById.avatarId);

  await leadershipById.destroy();
  await attachmentById.destroy();

  res.status(201).json({
    status: "success",
    message: "Deleted leadership",
    error: null,
    data: null,
  });
});
