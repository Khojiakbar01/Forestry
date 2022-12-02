const express = require("express");
const { body } = require("express-validator");
const metaInfoController = require("./metaInfoController");

const router = express.Router({ mergeParams: true });

router.route("/").get(metaInfoController.getAllMetaInfos).post(
  body("addressUz")
    .trim()
    .notEmpty()
    .withMessage("Address bo'sh bo'lishi mumkin emas!"),
  body("addressRu")
    .trim()
    .notEmpty()
    .withMessage("Address bo'sh bo'lishi mumkin emas!"),
  body("addressEn")
    .trim()
    .notEmpty()
    .withMessage("Address bo'sh bo'lishi mumkin emas!"),
  body("workingHoursUz")
    .trim()
    .notEmpty()
    .withMessage("Ish vaqti bo'sh bo'lishi mumkin emas!"),
  body("workingHoursRu")
    .trim()
    .notEmpty()
    .withMessage("Ish vaqti bo'sh bo'lishi mumkin emas!"),
  body("workingHoursEn")
    .trim()
    .notEmpty()
    .withMessage("Ish vaqti bo'sh bo'lishi mumkin emas!"),
  body("hotlines")
    .trim()
    .notEmpty()
    .withMessage("Ishonch telefoni bo'sh bo'lishi mumkin emas!"),
  body("mail")
    .trim()
    .notEmpty()
    .withMessage("Mail bo'sh bo'lishi mumkin emas!"),
  body("adminstrationPhone")
    .trim()
    .notEmpty()
    .withMessage("Adminstration Phone bo'sh bo'lishi mumkin emas!"),
  body("telegramLink")
    .trim()
    .notEmpty()
    .withMessage("Telegram bo'sh bo'lishi mumkin emas!"),
  body("instagramLink")
    .trim()
    .notEmpty()
    .withMessage("Instagram bo'sh bo'lishi mumkin emas!"),
  body("facebookLink")
    .trim()
    .notEmpty()
    .withMessage("Facebook bo'sh bo'lishi mumkin emas!"),
  body("mapLink")
    .trim()
    .notEmpty()
    .withMessage("Map bo'sh bo'lishi mumkin emas!"),

  metaInfoController.createMetaInfo
);

router
  .route("/:id")
  .get(metaInfoController.getById)
  .put(
    body("addressUz")
      .trim()
      .notEmpty()
      .withMessage("Address bo'sh bo'lishi mumkin emas!"),
    body("addressRu")
      .trim()
      .notEmpty()
      .withMessage("Address bo'sh bo'lishi mumkin emas!"),
    body("addressEn")
      .trim()
      .notEmpty()
      .withMessage("Address bo'sh bo'lishi mumkin emas!"),
    body("workinHoursUz")
      .trim()
      .notEmpty()
      .withMessage("Ish vaqti bo'sh bo'lishi mumkin emas!"),
    body("workinHoursRu")
      .trim()
      .notEmpty()
      .withMessage("Ish vaqti bo'sh bo'lishi mumkin emas!"),
    body("workinHoursEn")
      .trim()
      .notEmpty()
      .withMessage("Ish vaqti bo'sh bo'lishi mumkin emas!"),
    body("hotlines")
      .trim()
      .notEmpty()
      .withMessage("Ishonch telefoni bo'sh bo'lishi mumkin emas!"),
    body("mail")
      .trim()
      .notEmpty()
      .withMessage("Mail bo'sh bo'lishi mumkin emas!"),
    body("adminstrationPhone")
      .trim()
      .notEmpty()
      .withMessage("Adminstration Phone bo'sh bo'lishi mumkin emas!"),
    body("telegramLink")
      .trim()
      .notEmpty()
      .withMessage("Telegram bo'sh bo'lishi mumkin emas!"),
    body("instagramLink")
      .trim()
      .notEmpty()
      .withMessage("Instagram bo'sh bo'lishi mumkin emas!"),
    body("facebookLink")
      .trim()
      .notEmpty()
      .withMessage("Facebook bo'sh bo'lishi mumkin emas!"),
    body("mapLink")
      .trim()
      .notEmpty()
      .withMessage("Map bo'sh bo'lishi mumkin emas!"),
    metaInfoController.updateMetaInfo
  )
  .delete(metaInfoController.deleteMetaInfo);

module.exports = router;
