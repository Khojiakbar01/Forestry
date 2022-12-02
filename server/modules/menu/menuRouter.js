const express = require("express");
const {body} = require("express-validator");
const menuController = require("./menuController");
const authMiddleware = require("../../core/middlewares/authMiddleware");
const router = express.Router({mergeParams: true});

router.get("/",
    // authMiddleware,
    menuController.getAllMenus)
    .get("/edit/:id", menuController.getMenu)
    .post("/edit/:id",
        body("nameUz"),
        body("nameRu"),
        body("nameEn"),
        body('parentId'),
        menuController.editMenu)
    .get("/delete/:id", menuController.deleteMenu);


router.route('/add')
    .get(
        // authMiddleware,
        menuController.getMenuForAdd)
    .post(
        // authMiddleware,
        body("nameUz")
            .trim()
            .notEmpty()
            .withMessage("Menyu nomi bo'sh bo'lishi mumkin emas!"),
        body("nameRu")
            .trim()
            .notEmpty()
            .withMessage("Название меню не может быть пустым!"),
        body("nameEn")
            .trim()
            .notEmpty()
            .withMessage("Menu name cannot be empty!"),
        menuController.createMenu
    )


module.exports = router;

