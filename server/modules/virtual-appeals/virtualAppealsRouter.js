const express = require("express");
const { body } = require("express-validator");
const virtualAppealsController = require("./virtualAppealsController");
const uploader = require("../../core/middlewares/fileUploader");

const router = express.Router({ mergeParams: true });
router.route("/").get(virtualAppealsController.appealsView).post(
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Ism familya kiritish majburiy!"),
  body("birthDate")
    .isDate()
    .trim()
    .notEmpty()
    .withMessage("Tug'ulgan kunni kiritish majburiy!"),
  body("passportInformations")
    .trim()
    .notEmpty()
    .withMessage("Passport ma'lumotlari xato kiritildi!"),
  body("region").trim().notEmpty().withMessage("Viloyat tanlanishi majburiy!"),
  body("district").trim().notEmpty().withMessage("Tuman tanlanishi majburiy!"),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("Manzil ko'rsatilishi majburiy!"),
  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Telefon raqam bo'sh bo'lishi mumkin emas!"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email  bo'sh bo'lishi mumkin emas!"),
  body("appealText")
    .trim()
    .notEmpty()
    .withMessage("Murojaat matni bo'sh bo'lishi mumkin emas!"),

  virtualAppealsController.createVirtualAppeal
);
router.route("/statistics").get(virtualAppealsController.appealStatisticsView);
router
  .route("/regions/:regionId")
  .get(virtualAppealsController.getDistrictsByRegions);
router
  .route("/check-status")
  .get(virtualAppealsController.appealStatisticsView)
  .post(
    body("appealCode")
      .trim()
      .notEmpty()
      .withMessage("Murojaat code bo'sh bo'lishi mumkin emas"),
    virtualAppealsController.checkAppealStatus
  );
// router.route("/:id").get(virtualAppealsController.getById);

module.exports = router;
