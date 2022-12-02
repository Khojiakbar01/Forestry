const express = require("express");
const { body } = require("express-validator");
const openDataController = require("./openDataController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(openDataController.getAllOpenData)
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
    openDataController.createOpenData
  );

router
  .route("/:id")
  .get(openDataController.getById)
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
    openDataController.updateOpenData
  )
  .delete(openDataController.deleteOpenData);

module.exports = router;
