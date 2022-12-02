const pressCenterController = require("./pressCenterController");
const express = require("express");

const router = express.Router({mergeParams: true})
router.get("/:pressType", pressCenterController.pressCenterView);
router.get("/:pressType/:id", pressCenterController.pressCenterViewById);

module.exports =router