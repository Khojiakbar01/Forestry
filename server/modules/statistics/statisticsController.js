const { validationResult } = require("express-validator");
const Statistics = require("./Statistics");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");

exports.getAllStatistics = catchAsync(async (req, res) => {
  const lang =
    req.params.lang.charAt(0).toUpperCase() + req.params.lang.slice(1);
  let reqQuery = { ...req.query };
  reqQuery.fields = `id,name${lang},unit,amount`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  let allStatistics = await Statistics.findAndCountAll(
    queryBuilder.queryOptions
  );
  allStatistics = queryBuilder.createPage(allStatistics);
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      allStatistics,
    },
  });
});

exports.createStatistics = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const newStatistics = await Statistics.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Created new Statistic",
    error: null,
    data: {
      newStatistics,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const statisticsById = await Statistics.findByPk(id);

  if (!statisticsById) {
    return next(new AppError("Bunday Id li Statistika topilmadi"), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      statisticsById,
    },
  });
});

exports.updateStatistics = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const statisticsById = await Statistics.findByPk(id);
  if (!statisticsById) {
    return next(new AppError("Bunday Id li Statistika topilmadi"), 404);
  }
  const updatedStatistic = await statisticsById.update(req.body);
  res.json({
    status: "success",
    message: "Statistic's info edited",
    error: null,
    data: {
      updatedStatistic,
    },
  });
});

exports.deleteStatistics = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const statisticsById = await Statistics.findByPk(id);
  if (!statisticsById) {
    return next(new AppError("Bunday Id li Statistika topilmadi", 404));
  }
  await statisticsById.destroy();
  res.status(201).json({
    status: "success",
    message: "Deleted Statistics",
    error: null,
    data: null,
  });
});
