const express = require("express");
const { body } = require("express-validator");
const attachmentController = require("./attachmentController");
const { fileUploader } = require("../../core/middlewares/fileUploader2");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(fileUploader.array("files"), attachmentController.uploadAttachments);

// router
//   .route("/:id")
//   .get(attachmentController.getById)
//   .put(uploader.array("files"), attachmentController.updateAttachment)
//   .delete(attachmentController.deleteAttachment);

module.exports = router;
