const express = require("express");
const { body } = require("express-validator");
const leadershipAdminsController = require("./leadershipAdminsController");

const router = express.Router({ mergeParams: true });
router.route("/").get(leadershipAdminsController.allLeadershipsView);
router.route("/:id").get(leadershipAdminsController.leadershipActionsView);
// router
//   .route("/change-status")
//   .post(virtualAppealsAdminsController.appealStatusChangeView);
// router.route("/:id").get(virtualAppealsAdminsController.getById);

module.exports = router;
