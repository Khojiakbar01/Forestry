const { validationResult } = require("express-validator");
const Subscribers = require("./Subscribers");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");

exports.getAllSubscribers = catchAsync(async (req, res) => {
  const lang =
    req.params.lang.charAt(0).toUpperCase() + req.params.lang.slice(1);
  let reqQuery = { ...req.query };
  reqQuery.fields = `id,email`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  let allSubscribers = await Subscribers.findAndCountAll(
    queryBuilder.queryOptions
  );
  allSubscribers = queryBuilder.createPage(allSubscribers);
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      allSubscribers,
    },
  });
});

exports.createSubscriber= catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const newSubscriber = await Subscribers.create(req.body);
 
  res.status(201).json({
    status: "success",
    message: "Created new subscriber",
    error: null,
    data: {
      newSubscriber,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const subscriberById = await Subscribers.findByPk(id);

  if (!subscriberById) {
    return next(new AppError("Bunday Id li Subscriber topilmadi"), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      subscriberById,
    },
  });
});

exports.deleteSubscriber = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const subscriberById = await Subscribers.findByPk(id);
  if (!subscriberById) {
    return next(new AppError("Bunday Id li Subscriber topilmadi", 404));
  }
  await subscriberById.destroy();
  res.status(201).json({
    status: "success",
    message: "Deleted Subscriber",
    error: null,
    data: null,
  });
});
