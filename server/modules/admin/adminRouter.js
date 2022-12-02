const express = require("express");
const app = express();
const { body } = require("express-validator");
const authRouter = require("../login/authRouter");
const adminPanelRouter = require("../admin-panel/adminPanelRouter");
const menuRouter = require("../menu/menuRouter");
const pageRouter = require("../page/pageRouter");
const virtualAppealsAdminsRouter = require("../virtual-appeals/virtualAppealsAdminsRouter");
const pressCenterAdminRouter = require("../press-center/pressCenterAdminRouter");
const leadershipAdminsRouter = require("../leadership/leadershipAdminsRouter");

const router = express.Router();
router.use("/", adminPanelRouter);
router.use("/menu", menuRouter);
router.use("/page", pageRouter);
router.use("/virtual-appeals", virtualAppealsAdminsRouter);
router.use("/leaderships", leadershipAdminsRouter);

router.use("/press-center", pressCenterAdminRouter);
module.exports = router;
