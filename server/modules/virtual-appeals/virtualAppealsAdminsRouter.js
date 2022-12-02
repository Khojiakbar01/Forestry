const express = require("express");
const { body } = require("express-validator");
const virtualAppealsAdminsController = require("./virtualAppealsAdminsController");

const router = express.Router({ mergeParams: true });
router.route("/").get(virtualAppealsAdminsController.allAppealsView);
router
  .route("/change-status")
  .post(virtualAppealsAdminsController.appealStatusChangeView);
router.route("/:id").get(virtualAppealsAdminsController.getById);

module.exports = router;
