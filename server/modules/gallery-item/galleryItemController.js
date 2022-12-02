const { validationResult } = require("express-validator");
const GalleryItem = require("./GalleryItem");
const Attachment = require("../attachment/Attachment");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");

exports.getAllGalleryItems = catchAsync(async (req, res) => {
  const lang =
    req.params.lang.charAt(0).toUpperCase() + req.params.lang.slice(1);
  let reqQuery = { ...req.query };
  reqQuery.fields = `id,title${lang},attachmentId`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  let allGalleryItems = await GalleryItem.findAndCountAll(
    queryBuilder.queryOptions
  );
  allGalleryItems = queryBuilder.createPage(allGalleryItems);
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      allGalleryItems,
    },
  });
});

exports.createGalleryItem = catchAsync(async (req, res, next) => {
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
  const newGalleryItem = await GalleryItem.create(req.body);
  if (newGalleryItem) {
    attachmentById.update({ isPermanent: true });
  }

  res.status(201).json({
    status: "success",
    message: "Created new gallery item",
    error: null,
    data: {
      newGalleryItem,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const galleryItemById = await galleryItemById.findByPk(id);

  if (!galleryItemById) {
    return next(new AppError("Bunday Id li gallery Item topilmadi"), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      galleryItemById,
    },
  });
});

exports.updateGalleryItem = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const galleryItemById = await GalleryItem.findByPk(id);
  if (!galleryItemById) {
    return next(new AppError("Bunday Id li Gallery Item topilmadi"), 404);
  }
  const updatedGalleryItem = await galleryItemById.update(req.body);
  res.json({
    status: "success",
    message: "Gallery Item's info edited",
    error: null,
    data: {
      updatedGalleryItem,
    },
  });
});

exports.deleteGalleryItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const galleryItemById = await GalleryItem.findByPk(id);
  if (!galleryItemById) {
    return next(new AppError("Bunday Id li Gallery Item topilmadi", 404));
  }
  const attachmentById = await Attachment.findByPk(
    galleryItemById.attachmentId
  );
  const bannerById = await Attachment.findByPk(galleryItemById.bannerId);
  await galleryItemById.destroy();
  await attachmentById.destroy();
  await bannerById.destroy();
  res.status(201).json({
    status: "success",
    message: "Deleted Gallery Item",
    error: null,
    data: null,
  });
});
