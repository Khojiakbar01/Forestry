const express = require("express");
const { body } = require("express-validator");
const usefulLinksController = require("./usefulLinksController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(usefulLinksController.getAllUsefulLinks)
  .post(
    body("link")
      .trim()
      .notEmpty()
      .withMessage("link bo'sh bo'lishi mumkin emas!"),
    body("imgId")
      .trim()
      .notEmpty()
      .withMessage("Image Id bo'sh bo'lishi mumkin emas!"),
    usefulLinksController.createUsefulLink
  );

router
  .route("/:id")
  .get(usefulLinksController.getById)
  .put(
    body("link")
      .trim()
      .notEmpty()
      .withMessage("link bo'sh bo'lishi mumkin emas!"),
    body("imgId")
      .trim()
      .notEmpty()
      .withMessage("Image Id bo'sh bo'lishi mumkin emas!"),
    usefulLinksController.updateUsefulLink
  )
  .delete(usefulLinksController.deleteUsefulLink);

module.exports = router;
