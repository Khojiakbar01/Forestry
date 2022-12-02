const { validationResult } = require("express-validator");
const UsefulLink = require("./UsefulLinks");
const Attachment = require("../attachment/Attachment");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");

exports.getAllUsefulLinks = catchAsync(async (req, res) => {
  const lang =
    req.params.lang.charAt(0).toUpperCase() + req.params.lang.slice(1);
  let reqQuery = { ...req.query };
  reqQuery.fields = `id,link,imgId`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  let allUsefulLink = await UsefulLink.findAndCountAll(
    queryBuilder.queryOptions
  );
  allUsefulLink = queryBuilder.createPage(allUsefulLink);
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      allUsefulLink,
    },
  });
});

exports.createUsefulLink = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const attachmentById = await Attachment.findByPk(req.body.imgId);
  if (!attachmentById) {
    return next(new AppError("Bunday Id li image topilmadi"), 404);
  }
  const newUsefulLink = await UsefulLink.create(req.body);
  if (newUsefulLink) {
    attachmentById.update({ isPermanent: true });
  }

  res.status(201).json({
    status: "success",
    message: "Created new Useful link",
    error: null,
    data: {
      newUsefulLink,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const usefulLinkById = await UsefulLink.findByPk(id);

  if (!usefulLinkById) {
    return next(new AppError("Bunday Id li Useful link topilmadi"), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      usefulLinkById,
    },
  });
});

exports.updateUsefulLink = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const usefulLinkById = await UsefulLink.findByPk(id);
  if (!usefulLinkById) {
    return next(new AppError("Bunday Id li Useful Link topilmadi"), 404);
  }
  const updatedUsefulLink = await usefulLinkById.update(req.body);
  res.json({
    status: "success",
    message: "UsefulLink's info edited",
    error: null,
    data: {
      updatedUsefulLink,
    },
  });
});

exports.deleteUsefulLink = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const usefulLinkById = await UsefulLink.findByPk(id);
  if (!usefulLinkById) {
    return next(new AppError("Bunday Id li UsefulLink topilmadi", 404));
  }
  const attachmentById = await Attachment.findByPk(usefulLinkById.imgId);
  await usefulLinkById.destroy();
  await attachmentById.destroy();
  res.status(201).json({
    status: "success",
    message: "Deleted UsefulLink",
    error: null,
    data: null,
  });
});
