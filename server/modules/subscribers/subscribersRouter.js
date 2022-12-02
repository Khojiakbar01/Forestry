const express = require("express");
const { body } = require("express-validator");
const subscribersController = require("./subscribersController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(subscribersController.getAllSubscribers)
  .post(
    body("email")
      .isEmail()
      .trim()
      .notEmpty()
      .withMessage("Email bo'sh bo'lishi mumkin emas"),
    subscribersController.createSubscriber
  );

router
  .route("/:id")
  .get(subscribersController.getById)
  .delete(subscribersController.deleteSubscriber);

module.exports = router;
