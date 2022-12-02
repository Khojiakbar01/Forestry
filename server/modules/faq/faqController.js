const { validationResult } = require("express-validator");
const Faq = require("./Faq");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");

exports.getAllFaqs = catchAsync(async (req, res) => {
  const lang =
    req.params.lang.charAt(0).toUpperCase() + req.params.lang.slice(1);
  let reqQuery = { ...req.query };
  reqQuery.fields = `id,question${lang},answer${lang}`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  let allFaqs = await Faq.findAndCountAll(queryBuilder.queryOptions);
  allFaqs = queryBuilder.createPage(allFaqs);
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      allFaqs,
    },
  });
});

exports.createFaq = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const newFaq = await Faq.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Created new Faq",
    error: null,
    data: {
      newFaq,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const faqById = await Faq.findByPk(id);

  if (!faqById) {
    return next(new AppError("Bunday Id li Faq topilmadi"), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      faqById,
    },
  });
});

exports.updateFaq = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const faqById = await Faq.findByPk(id);
  if (!faqById) {
    return next(new AppError("Bunday Id li faq topilmadi"), 404);
  }
  const updatedFaq = await faqById.update(req.body);
  res.json({
    status: "success",
    message: "Faq's info edited",
    error: null,
    data: {
      updatedFaq,
    },
  });
});

exports.deleteFaq = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const faqById = await Faq.findByPk(id);
  if (!faqById) {
    return next(new AppError("Bunday Id li Faq topilmadi", 404));
  }
  await faqById.destroy();
  res.status(201).json({
    status: "success",
    message: "Deleted Faq",
    error: null,
    data: null,
  });
});
