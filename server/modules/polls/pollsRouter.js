const express = require("express");
const { body } = require("express-validator");
const pollsController = require("./pollsController");
const pollParticipantsController = require("../polls-participants/pollParticipantsController");

const router = express.Router({ mergeParams: true });

router.route("/").get(pollsController.getAllPolls).post(
  body(`questionUz`)
    .trim()
    .notEmpty()
    .withMessage("Savol bo'sh bo'lishi mumkin emas!"),
  body("questionRu")
    .trim()
    .notEmpty()
    .withMessage("Savol bo'sh bo'lishi mumkin emas!"),
  body("questionEn")
    .trim()
    .notEmpty()
    .withMessage("Savol bo'sh bo'lishi mumkin emas!"),

  pollsController.createPoll
);

router
  .route("/:id/rate")
  .post(
    body("sessionId")
      .trim()
      .notEmpty()
      .withMessage("sessionId bo'sh bo'lishi mumkin emas!"),
    body("answerId")
      .trim()
      .notEmpty()
      .withMessage("answer Id bo'sh bo'lishi mumkin emas!"),
    pollParticipantsController.createPollParticipant
  );

router
  .route("/:id")
  .get(pollsController.getById)
  .put(
    body("questionUz")
      .trim()
      .notEmpty()
      .withMessage("Savol bo'sh bo'lishi mumkin emas!"),
    body("questionRu")
      .trim()
      .notEmpty()
      .withMessage("Savol bo'sh bo'lishi mumkin emas!"),
    body("questionEn")
      .trim()
      .notEmpty()
      .withMessage("Savol bo'sh bo'lishi mumkin emas!"),
    pollsController.updatePoll
  )
  .delete(pollsController.deletePoll);

module.exports = router;
