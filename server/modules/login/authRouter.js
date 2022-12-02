const express = require("express");
const app = express();
const { body } = require("express-validator");
const authController = require("./authController");

const router = express.Router();

router.get("/", authController.getLogin)

router.post(
  "/",
  body("username")
    .notEmpty()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Username must contain contain at least 5 characters"),
  body("password")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must contain contain at least 6 characters"),
  authController.login
);

router.post("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (!err) {
      res.clearCookie("connect.sid");
      return res.redirect("/login");
    }
    console.log(err);
  });
});

module.exports = router;
