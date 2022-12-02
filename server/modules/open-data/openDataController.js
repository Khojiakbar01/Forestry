const { validationResult } = require("express-validator");
const OpenData = require("./Opendata");
const OpenDataAttachment = require("../open-data-attachment/OpenDataAttachment");
const Attachment = require("../attachment/Attachment");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");

exports.getAllOpenData = catchAsync(async (req, res) => {
  const lang =
    req.params.lang.charAt(0).toUpperCase() + req.params.lang.slice(1);
  let reqQuery = { ...req.query };
  reqQuery.fields = `id,title${lang}`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  let allOpenData = await OpenData.findAndCountAll(queryBuilder.queryOptions);
  allOpenData = queryBuilder.createPage(allOpenData);
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      allOpenData,
    },
  });
});

exports.createOpenData = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const attachments = req.body.attachments;
  const newOpenData = await OpenData.create(req.body);
  for (let i = 0; i < attachments.length; i++) {
    const attachmentByOpenDataId = await Attachment.findByPk(attachments[i].id);
    const openDataAttachment = {
      openDataId: newOpenData.id,
      attachmentId: attachments[i].id,
    };
    await OpenDataAttachment.create(openDataAttachment);
    await attachmentByOpenDataId.update({ isPermanent: true });
  }

  res.status(201).json({
    status: "success",
    message: "Created new Open Data",
    error: null,
    data: {
      newOpenData,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const openDataById = await OpenData.findOne({
    where: { id: { [Op.eq]: id } },
    attributes: ["id", "titleUz", "titleRu", "titleEn"],
    include: [
      {
        model: OpenDataAttachment,
        as: "openDataAttachments",
      },
    ],
  });

  if (!openDataById) {
    return next(new AppError("Bunday Id li Open Data topilmadi"), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      openDataById,
    },
  });
});

exports.updateOpenData = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const attachments = req.body.attachments;
  const openDataById = await OpenData.findByPk(id);
  const attachmentsByOpenDataId = await OpenDataAttachment.findAll({
    where: { openDataId: { [Op.eq]: id } },
  });
  if (!openDataById || !attachmentsByOpenDataId) {
    return next(new AppError("Bunday Id li Open Data topilmadi"), 404);
  }
  await openDataById.update(req.body);
  for (let i = 0; i < attachments.length; i++) {
    const updateAttachment = attachments[i];
    const openDataAttachment = await OpenDataAttachment.findByPk(
      updateAttachment.id
    );
    await openDataAttachment.update(updateAttachment);
  }
  const updatedOpenData = await OpenData.findAll({
    where: { id: { [Op.eq]: id } },
    attributes: ["id", "titleUz", "titleRu", "titleEn"],
    include: [
      {
        model: OpenDataAttachment,
        as: "attachments",
      },
    ],
  });
  res.json({
    status: "success",
    message: "Open Data's info edited",
    error: null,
    data: {
      updatedOpenData,
    },
  });
});

exports.deleteOpenData = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const openDataById = await OpenData.findByPk(id);
  if (!openDataById) {
    return next(new AppError("Bunday Id li Open Data topilmadi", 404));
  }
  await openDataById.destroy();
  res.status(201).json({
    status: "success",
    message: "Deleted Open Data",
    error: null,
    data: null,
  });
});
