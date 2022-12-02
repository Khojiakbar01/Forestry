const { validationResult } = require("express-validator");
const MetaInfo = require("./MetaInfo");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");

exports.getAllMetaInfos = catchAsync(async (req, res) => {
  const lang =
    req.params.lang.charAt(0).toUpperCase() + req.params.lang.slice(1);
  let reqQuery = { ...req.query };
  reqQuery.fields = `id,address${lang},workingHours${lang},mail,adminstrationPhone,telegramLink,instagramLink,facebookLink,mapLink,hotlines`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  let allMetaInfos = await MetaInfo.findAndCountAll(queryBuilder.queryOptions);
  allMetaInfos = queryBuilder.createPage(allMetaInfos);
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      allMetaInfos,
    },
  });
});

exports.createMetaInfo = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const newMetaInfo = await MetaInfo.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Created new Meta Info",
    error: null,
    data: {
      newMetaInfo,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const metaInfoById = await MetaInfo.findByPk(id);

  if (!metaInfoById) {
    return next(new AppError("Bunday Id li Meta Info topilmadi"), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      metaInfoById,
    },
  });
});

exports.updateMetaInfo = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const metaInfoById = await MetaInfo.findByPk(id);
  if (!metaInfoById) {
    return next(new AppError("Bunday Id li Meta Info topilmadi"), 404);
  }
  const updatedMetaInfo = await metaInfoById.update(req.body);
  res.json({
    status: "success",
    message: "Meta Info's info edited",
    error: null,
    data: {
      updatedMetaInfo,
    },
  });
});

exports.deleteMetaInfo = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const metaInfoById = await MetaInfo.findByPk(id);
  if (!metaInfoById) {
    return next(new AppError("Bunday Id li Meta Info topilmadi", 404));
  }
  await metaInfoById.destroy();
  res.status(201).json({
    status: "success",
    message: "Deleted Meta Info",
    error: null,
    data: null,
  });
});
