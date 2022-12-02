const express = require("express");
const {body} = require("express-validator");
const pageController = require("./pageController");
const authMiddleware = require("../../core/middlewares/authMiddleware");
const router = express.Router({mergeParams: true});

router.get("/",
    // authMiddleware,
    pageController.getAllPages)
    .get("/edit/:id",
        // authMiddleware,
        pageController.getPage)
    .post("/edit/:id",
        // authMiddleware,
        body("titleUz"),
        body("titleRu"),
        body("titleEn"),
        body("contentUz"),
        body("contentRu"),
        body("contentEn"),
        pageController.editPage)
    .get("/delete/:id",

        pageController.deletePage);

router.route('/add')
    .get(
        // authMiddleware,
        pageController.getPageForAdd)
    .post(
        // authMiddleware,
        body("titleUz")
            .trim()
            .notEmpty()
            .withMessage("Sarlavha nomi bo'sh bo'lishi mumkin emas!"),
        body("titleRu")
            .trim()
            .notEmpty()
            .withMessage("Добавьте заголовок!"),
        body("titleEn")
            .trim()
            .notEmpty()
            .withMessage("Title cannot me empty!"),
        body("contentUz")
            .trim()
            .notEmpty()
            .withMessage("Maqola bosh bo'lishi mumkin emas!"),
        body("contentRu")
            .trim()
            .notEmpty()
            .withMessage("Добавьте текст!"),
        body("contentEn")
            .trim()
            .notEmpty()
            .withMessage("Content cannot be empty!"),
        body("menuId").notEmpty(),
        pageController.createPage
    );


module.exports = router;
