const express = require("express");
const { body } = require("express-validator");
const galleryItemController = require("./galleryItemController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(galleryItemController.getAllGalleryItems)
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
    galleryItemController.createGalleryItem
  );

router
  .route("/:id")
  .get(galleryItemController.getById)
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
    galleryItemController.updateGalleryItem
  )
  .delete(galleryItemController.deleteGalleryItem);

module.exports = router;
