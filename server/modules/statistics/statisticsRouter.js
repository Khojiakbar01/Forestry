const express = require("express");
const { body } = require("express-validator");
const statisticsController = require("./statisticsController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(statisticsController.getAllStatistics)
  .post(
    body("nameUz")
      .trim()
      .notEmpty()
      .withMessage("Name bo'sh bo'lishi mumkin emas!"),
    body("nameRu")
      .trim()
      .notEmpty()
      .withMessage("Name bo'sh bo'lishi mumkin emas!"),
    body("nameEn")
      .trim()
      .notEmpty()
      .withMessage("Name bo'sh bo'lishi mumkin emas!"),
    body("unit")
      .trim()
      .notEmpty()
      .withMessage("Unit bo'sh bo'lishi mumkin emas!"),
    body("amount")
      .notEmpty()
      .isInt({ min: 0 })
      .withMessage("Amount bo'sh bo'lishi mumkin emas!"),

    statisticsController.createStatistics
  );

router
  .route("/:id")
  .get(statisticsController.getById)
  .put(
    body("nameUz")
      .trim()
      .notEmpty()
      .withMessage("Name bo'sh bo'lishi mumkin emas!"),
    body("nameRu")
      .trim()
      .notEmpty()
      .withMessage("Name bo'sh bo'lishi mumkin emas!"),
    body("nameEn")
      .trim()
      .notEmpty()
      .withMessage("Name bo'sh bo'lishi mumkin emas!"),
    body("unit")
      .trim()
      .notEmpty()
      .withMessage("Unit bo'sh bo'lishi mumkin emas!"),
    body("amount")
      .notEmpty()
      .isInt({ min: 0 })
      .withMessage("Amount bo'sh bo'lishi mumkin emas!"),
    statisticsController.updateStatistics
  )
  .delete(statisticsController.deleteStatistics);

module.exports = router;
