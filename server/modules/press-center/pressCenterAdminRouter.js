const express = require("express");
const {body} = require("express-validator");
const pressCenterAdminController = require("./pressCenterAdminController");
const authMiddleware = require("../../core/middlewares/authMiddleware");

const router = express.Router({mergeParams: true})


router.route('/:pressType').get(pressCenterAdminController.getAllPressCentersView)
router.route('/:pressType/add')
    .get(
        // authMiddleware,
        pressCenterAdminController.getPressCentersForAddView)
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
        body("textUz")
            .trim()
            .notEmpty()
            .withMessage("Text bo'sh bo'lishi mumkin emas!"),
        body("textRu")
            .trim()
            .notEmpty()
            .withMessage("Text bo'sh bo'lishi mumkin emas!"),
        body("textEn")
            .trim()
            .notEmpty()
            .withMessage("Text bo'sh bo'lishi mumkin emas!"),
        body("type")
            .trim()
            .notEmpty()
            .withMessage("Type bo'sh bo'lishi mumkin emas!"),
        pressCenterAdminController.createPressCenter
    );

router.route('/:pressType/edit/:id')
    .get(
        // authMiddleware,
        pressCenterAdminController.getPressCentersForEditView)
    .post(pressCenterAdminController.editPressCenterView)
router.route('/:pressType/delete/:id')
    .get(
        // authMiddleware,
        pressCenterAdminController.deletePressCenter)
// router.route('/events').get(pressCenterAdminController.getAllEvents)
//
// router.route('/tenders').get(pressCenterAdminController.getAllTenders)

// router.route("/").get(pressCenterAdminController).post(
//     body("titleUz")
//         .trim()
//         .notEmpty()
//         .withMessage("Title bo'sh bo'lishi mumkin emas!"),
//     body("titleRu")
//         .trim()
//         .notEmpty()
//         .withMessage("Title bo'sh bo'lishi mumkin emas!"),
//     body("titleEn")
//         .trim()
//         .notEmpty()
//         .withMessage("Title bo'sh bo'lishi mumkin emas!"),
//     body("textUz")
//         .trim()
//         .notEmpty()
//         .withMessage("Text bo'sh bo'lishi mumkin emas!"),
//     body("textRu")
//         .trim()
//         .notEmpty()
//         .withMessage("Text bo'sh bo'lishi mumkin emas!"),
//     body("textEn")
//         .trim()
//         .notEmpty()
//         .withMessage("Text bo'sh bo'lishi mumkin emas!"),
//     body("type")
//         .trim()
//         .notEmpty()
//         .withMessage("Type bo'sh bo'lishi mumkin emas!"),
//
//     pressCenterAdminController.createPressCenter
// );
//
// router
//     .route("/:id")
//     .get(pressCenterAdminController.getById)
//     .put(
//         body("titleUz")
//             .trim()
//             .notEmpty()
//             .withMessage("Title bo'sh bo'lishi mumkin emas!"),
//         body("titleRu")
//             .trim()
//             .notEmpty()
//             .withMessage("Title bo'sh bo'lishi mumkin emas!"),
//         body("titleEn")
//             .trim()
//             .notEmpty()
//             .withMessage("Title bo'sh bo'lishi mumkin emas!"),
//         body("textUz")
//             .trim()
//             .notEmpty()
//             .withMessage("Text bo'sh bo'lishi mumkin emas!"),
//         body("textRu")
//             .trim()
//             .notEmpty()
//             .withMessage("Text bo'sh bo'lishi mumkin emas!"),
//         body("textEn")
//             .trim()
//             .notEmpty()
//             .withMessage("Text bo'sh bo'lishi mumkin emas!"),
//         body("type")
//             .trim()
//             .notEmpty()
//             .withMessage("Type bo'sh bo'lishi mumkin emas!"),
//         pressCenterAdminController.updatePressCenter
//     )
//     .delete(pressCenterAdminController.deletePressCenter);

module.exports = router;
