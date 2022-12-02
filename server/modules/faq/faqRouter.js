const express = require("express");
const { body } = require("express-validator");
const faqController = require("./faqController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(faqController.getAllFaqs)
  .post(
    body("questionUz")
      .trim()
      .notEmpty()
      .withMessage("Savol bo'sh bo'lishi mumkin emas"),
    body("questionRu")
      .trim()
      .notEmpty()
      .withMessage("Savol bo'sh bo'lishi mumkin emas"),
    body("questionEn")
      .trim()
      .notEmpty()
      .withMessage("Savol bo'sh bo'lishi mumkin emas"),
    body("answerUz")
      .trim()
      .notEmpty()
      .withMessage("Javob bo'sh bo'lishi mumkin emas"),
    body("answerRu")
      .trim()
      .notEmpty()
      .withMessage("Javob bo'sh bo'lishi mumkin emas"),
    body("answerEn")
      .trim()
      .notEmpty()
      .withMessage("Javob bo'sh bo'lishi mumkin emas"),
    faqController.createFaq
  );

router
  .route("/:id")
  .get(faqController.getById)
  .put(
    body("questionUz")
      .trim()
      .notEmpty()
      .withMessage("Savol bo'sh bo'lishi mumkin emas"),
    body("questionRu")
      .trim()
      .notEmpty()
      .withMessage("Savol bo'sh bo'lishi mumkin emas"),
    body("questionEn")
      .trim()
      .notEmpty()
      .withMessage("Savol bo'sh bo'lishi mumkin emas"),
    body("answerUz")
      .trim()
      .notEmpty()
      .withMessage("Javob bo'sh bo'lishi mumkin emas"),
    body("answerRu")
      .trim()
      .notEmpty()
      .withMessage("Javob bo'sh bo'lishi mumkin emas"),
    body("answerEn")
      .trim()
      .notEmpty()
      .withMessage("Javob bo'sh bo'lishi mumkin emas"),
    faqController.updateFaq
  )
  .delete(faqController.deleteFaq);

  module.exports=router;
