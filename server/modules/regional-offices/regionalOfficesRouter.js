const express = require("express");
const { body } = require("express-validator");
const regionalOfficesController = require("./regionalOfficesController");

const router = express.Router({ mergeParams: true });

router.route("/").get(regionalOfficesController.getAllRegionalOffices).post(
  body("regionUz")
    .trim()
    .notEmpty()
    .withMessage("Name bo'sh bo'lishi mumkin emas!"),
  body("regionRu")
    .trim()
    .notEmpty()
    .withMessage("Name bo'sh bo'lishi mumkin emas!"),
  body("regionEn")
    .trim()
    .notEmpty()
    .withMessage("Name bo'sh bo'lishi mumkin emas!"),
  body("addressUz")
    .trim()
    .notEmpty()
    .withMessage("Name bo'sh bo'lishi mumkin emas!"),
  body("addressRu")
    .trim()
    .notEmpty()
    .withMessage("Name bo'sh bo'lishi mumkin emas!"),
  body("addressEn")
    .trim()
    .notEmpty()
    .withMessage("Name bo'sh bo'lishi mumkin emas!"),
  body("principal")
    .trim()
    .notEmpty()
    .withMessage("Principal bo'sh bo'lishi mumkin emas!"),
  body("mail")
    .trim()
    .notEmpty()
    .withMessage("Principal bo'sh bo'lishi mumkin emas!"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Principal bo'sh bo'lishi mumkin emas!"),

  regionalOfficesController.createRegionalOffice
);

router
  .route("/:id")
  .get(regionalOfficesController.getById)
  .put(
    body("regionUz")
      .trim()
      .notEmpty()
      .withMessage("Name bo'sh bo'lishi mumkin emas!"),
    body("regionRu")
      .trim()
      .notEmpty()
      .withMessage("Name bo'sh bo'lishi mumkin emas!"),
    body("regionEn")
      .trim()
      .notEmpty()
      .withMessage("Name bo'sh bo'lishi mumkin emas!"),
    body("addressUz")
      .trim()
      .notEmpty()
      .withMessage("Name bo'sh bo'lishi mumkin emas!"),
    body("addressRu")
      .trim()
      .notEmpty()
      .withMessage("Name bo'sh bo'lishi mumkin emas!"),
    body("addressEn")
      .trim()
      .notEmpty()
      .withMessage("Name bo'sh bo'lishi mumkin emas!"),
    body("principal")
      .trim()
      .notEmpty()
      .withMessage("Principal bo'sh bo'lishi mumkin emas!"),
    body("mail")
      .trim()
      .notEmpty()
      .withMessage("Principal bo'sh bo'lishi mumkin emas!"),
    body("phone")
      .trim()
      .notEmpty()
      .withMessage("Principal bo'sh bo'lishi mumkin emas!"),
    regionalOfficesController.updateRegionalOffice
  )
  .delete(regionalOfficesController.deleteRegionalOffice);

module.exports = router;
