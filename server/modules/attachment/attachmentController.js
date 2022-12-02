const Attachment = require("./Attachment");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { imageConverter } = require("../../core/middlewares/imageConverter");
const fileUploader = require("../../core/middlewares/fileUploader");

exports.uploadAttachments = catchAsync(async (req, res, next) => {
  const files = req.files;
  let attachments = [];
  for (let i = 0; i < files.length; i++) {
    let imageUploader;
    const file = {
      name: "",
      originalName: files[i].originalname,
      size: files[i].encoding,
      type: files[i].mimetype,
    };
    if (files[i].mimetype.startsWith("image")) {
      imageUploader = await imageConverter(files[i]);
      file.name = imageUploader.fileName;
    } else {
      const uploadedFileName = await fileUploader(files[i]);
      file.name = uploadedFileName;
    }
    const newAttachment = await Attachment.create(file);
    attachments.push(newAttachment);
  }
  res.status(201).json({
    status: "success",
    message: "Created new Attachments",
    error: null,
    data: {
      attachments,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const attachmentById = await Attachment.findByPk(id);
  if (!attachmentById) {
    return next(new AppError("Bunday id li attachment topilmadi", 404));
  }
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      attachmentById,
    },
  });
});

exports.updateAttachment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const files = req.files;
  const attachmentById = await Attachment.findByPk(id);
  if (!attachmentById) {
    return next(new AppError("Bunday Id li Attachment  topilmadi"), 404);
  }
  const file = {
    name: files[0].filename,
    originalName: files[0].originalname,
    size: files[0].encoding,
    type: files[0].mimetype,
  };
  const updatedAttachment = await attachmentById.update(file);
  res.json({
    status: "success",
    message: "Attachment's info edited",
    error: null,
    data: {
      updatedAttachment,
    },
  });
});

exports.deleteAttachment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const attachmentById = await Attachment.findByPk(id);
  if (!attachmentById) {
    return next(new AppError("Bunday id li attachment topilmadi", 404));
  }
  await attachmentById.destroy();
  res.json({
    status: "success",
    message: "Deleted Attachment",
    error: null,
    data: {},
  });
});
