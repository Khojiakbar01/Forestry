const express = require("express");
const { body } = require("express-validator");
const leadershipController = require("./leadershipController");

const router = express.Router({ mergeParams: true });

router.route("/").get(leadershipController.getAllLeadership).post(
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("Ism bo'sh bo'lishi mumkin emas"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Familya bo'sh bo'lishi mumkin emas"),
  body("middleName")
    .trim()
    .notEmpty()
    .withMessage("Middle name bo'sh bo'lishi mumkin emas"),
  body("positionUz")
    .trim()
    .notEmpty()
    .withMessage("Position bo'sh bo'lishi mumkin emas!"),
  body("positionRu")
    .trim()
    .notEmpty()
    .withMessage("Position bo'sh bo'lishi mumkin emas!"),
  body("positionEn")
    .trim()
    .notEmpty()
    .withMessage("Position bo'sh bo'lishi mumkin emas!"),
  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Telefon nomer bo'sh bo'lishi mumkin emas!"),
  body("fax")
    .trim()
    .notEmpty()
    .withMessage("Telefon nomer bo'sh bo'lishi mumkin emas!"),
  body("email")
    .isEmail()
    .trim()
    .notEmpty()
    .withMessage("mail nomer bo'sh bo'lishi mumkin emas!"),
  body("admissionDaysUz")
    .trim()
    .notEmpty()
    .withMessage("Qabul kunlari bo'sh bo'lishi mumkin emas!"),
  body("admissionDaysRu")
    .trim()
    .notEmpty()
    .withMessage("Qabul kunlari bo'sh bo'lishi mumkin emas!"),
  body("admissionDaysEn")
    .trim()
    .notEmpty()
    .withMessage("Qabul kunlari bo'sh bo'lishi mumkin emas!"),
  body("biographyUz")
    .trim()
    .notEmpty()
    .withMessage("Tarjimai hol bo'sh bo'lishi mumkin emas!"),
  body("biographyRu")
    .trim()
    .notEmpty()
    .withMessage("Tarjimai hol bo'sh bo'lishi mumkin emas!"),
  body("biographyEn")
    .trim()
    .notEmpty()
    .withMessage("Tarjimai hol bo'sh bo'lishi mumkin emas!"),
  body("avatarId")
    .trim()
    .notEmpty()
    .withMessage("Avatar Id bo'sh bo'lishi mumkin emas!"),

  leadershipController.createLeadership
);

router
  .route("/:id")
  .get(leadershipController.getById)
  .put(
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("Ism bo'sh bo'lishi mumkin emas"),
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Familya bo'sh bo'lishi mumkin emas"),
    body("middleName")
      .trim()
      .notEmpty()
      .withMessage("Middle name bo'sh bo'lishi mumkin emas"),
    body("positionUz")
      .trim()
      .notEmpty()
      .withMessage("Position bo'sh bo'lishi mumkin emas!"),
    body("positionRu")
      .trim()
      .notEmpty()
      .withMessage("Position bo'sh bo'lishi mumkin emas!"),
    body("positionEn")
      .trim()
      .notEmpty()
      .withMessage("Position bo'sh bo'lishi mumkin emas!"),
    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Telefon nomer bo'sh bo'lishi mumkin emas!"),
    body("fax")
      .trim()
      .notEmpty()
      .withMessage("Telefon nomer bo'sh bo'lishi mumkin emas!"),
    body("email")
      .isEmail()
      .trim()
      .notEmpty()
      .withMessage("mail nomer bo'sh bo'lishi mumkin emas!"),
    body("admissionDaysUz")
      .trim()
      .notEmpty()
      .withMessage("Qabul kunlari bo'sh bo'lishi mumkin emas!"),
    body("admissionDaysRu")
      .trim()
      .notEmpty()
      .withMessage("Qabul kunlari bo'sh bo'lishi mumkin emas!"),
    body("admissionDaysEn")
      .trim()
      .notEmpty()
      .withMessage("Qabul kunlari bo'sh bo'lishi mumkin emas!"),
    body("biographyUz")
      .trim()
      .notEmpty()
      .withMessage("Tarjimai hol bo'sh bo'lishi mumkin emas!"),
    body("biographyRu")
      .trim()
      .notEmpty()
      .withMessage("Tarjimai hol bo'sh bo'lishi mumkin emas!"),
    body("biographyEn")
      .trim()
      .notEmpty()
      .withMessage("Tarjimai hol bo'sh bo'lishi mumkin emas!"),
    body("avatarId")
      .trim()
      .notEmpty()
      .withMessage("Avatar Id bo'sh bo'lishi mumkin emas!"),
    leadershipController.updateLeadership
  )
  .delete(leadershipController.deleteLeadership);

module.exports = router;
