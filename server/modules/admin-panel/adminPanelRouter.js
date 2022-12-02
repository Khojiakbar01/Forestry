const express = require("express");
const app = express();
const { body } = require("express-validator");

const adminPanelController = require("./adminPanelController");
const authMiddleware = require("../../core/middlewares/authMiddleware");

const router = express.Router();

router.get("/",
    // authMiddleware,
    adminPanelController.getAdminPanel);

module.exports = router;
