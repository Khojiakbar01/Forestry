const { validationResult } = require("express-validator");
const RegionalOffices = require("./RegionalOffices");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");

exports.getAllRegionalOffices = catchAsync(async (req, res) => {
  const lang =
    req.params.lang.charAt(0).toUpperCase() + req.params.lang.slice(1);
  let reqQuery = { ...req.query };
  reqQuery.fields = `id,region${lang},principal,address${lang},mail,phone`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  let allRegionalOffices = await RegionalOffices.findAndCountAll(
    queryBuilder.queryOptions
  );
  allRegionalOffices = queryBuilder.createPage(allRegionalOffices);
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      allRegionalOffices,
    },
  });
});

exports.createRegionalOffice = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const newRegionalOffice = await RegionalOffices.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Created new RegionalOffice",
    error: null,
    data: {
      newRegionalOffice,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const regionalOfficeById = await RegionalOffices.findByPk(id);

  if (!regionalOfficeById) {
    return next(new AppError("Bunday Id li RegionalOffice topilmadi"), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      regionalOfficeById,
    },
  });
});

exports.updateRegionalOffice = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const regionalOfficeById = await RegionalOffices.findByPk(id);
  if (!regionalOfficeById) {
    return next(new AppError("Bunday Id li RegionalOffice topilmadi"), 404);
  }
  const updatedRegionalOffice = await regionalOfficeById.update(req.body);
  res.json({
    status: "success",
    message: "Faq's info edited",
    error: null,
    data: {
      updatedRegionalOffice,
    },
  });
});

exports.deleteRegionalOffice = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const regionalOfficeById = await RegionalOffices.findByPk(id);
  if (!regionalOfficeById) {
    return next(new AppError("Bunday Id li RegionalOffice topilmadi", 404));
  }
  await regionalOfficeById.destroy();
  res.status(201).json({
    status: "success",
    message: "Deleted RegionalOffice",
    error: null,
    data: null,
  });
});
