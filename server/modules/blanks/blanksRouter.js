const express = require("express");
const { body } = require("express-validator");
const blanksController = require("./blanksController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(blanksController.getAllBlanks)
  .post(
    body("titleUz")
      .trim()
      .notEmpty()
      .withMessage("Title bo'sh bo'lishi mumkin emas!"),
    body("titleRu")
      .trim()
      .notEmpty()
      .withMessage("Title bo'sh bo'lishi mumkin emas!"),
    body("titleEn")
      .trim()
      .notEmpty()
      .withMessage("Title bo'sh bo'lishi mumkin emas!"),
    body("descriptionUz")
      .trim()
      .notEmpty()
      .withMessage("Description bo'sh bo'lishi mumkin emas!"),
    body("descriptionRu")
      .trim()
      .notEmpty()
      .withMessage("Description bo'sh bo'lishi mumkin emas!"),
    body("descriptionEn")
      .trim()
      .notEmpty()
      .withMessage("Description bo'sh bo'lishi mumkin emas!"),
    body("attachmentId")
      .trim()
      .notEmpty()
      .withMessage("Attachment Id bo'sh bo'lishi mumkin emas!"),
    blanksController.createBlank
  );

router
  .route("/:id")
  .get(blanksController.getById)
  .put(
    body("titleUz")
    .trim()
    .notEmpty()
    .withMessage("Title bo'sh bo'lishi mumkin emas!"),
  body("titleRu")
    .trim()
    .notEmpty()
    .withMessage("Title bo'sh bo'lishi mumkin emas!"),
  body("titleEn")
    .trim()
    .notEmpty()
    .withMessage("Title bo'sh bo'lishi mumkin emas!"),
  body("descriptionUz")
    .trim()
    .notEmpty()
    .withMessage("Description bo'sh bo'lishi mumkin emas!"),
  body("descriptionRu")
    .trim()
    .notEmpty()
    .withMessage("Description bo'sh bo'lishi mumkin emas!"),
  body("descriptionEn")
    .trim()
    .notEmpty()
    .withMessage("Description bo'sh bo'lishi mumkin emas!"),
  body("attachmentId")
    .trim()
    .notEmpty()
    .withMessage("Attachment Id bo'sh bo'lishi mumkin emas!"),
    blanksController.updateBlank
  )
  .delete(blanksController.deleteBlank);

module.exports = router;
