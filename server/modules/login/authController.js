const catchAsync = require("../../core/utils/catchAsync");
const AppError = require("../../core/utils/AppError");
const jsonWebToken = require("jsonwebtoken");

const { compare } = require("bcrypt");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const User = require("../user/User");

const findByUsername = async (username) => {
  const admin = await User.findOne({
    where: { username: { [Op.eq]: username } },
  });
  if (admin) {
    return admin;
  }
  return null;
};

const generateToken = (payload, jwtSecret, options) => {
  return new Promise((resolve, reject) => {
    jsonWebToken.sign(payload, jwtSecret, options, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.errors.length > 0) {
    return res.render("./pages/admin/login/login", {
      errors: validationErrors.errors.map((e) => e.msg),
    });
  }

  const { username, password } = req.body;

  const candidate = await findByUsername(username);
  if (!candidate) {
    return res.render("./pages/admin/login/login", {
      errors: ["Username or password wrong"],
    });
  }

  const passwordIsMatch = await compare(password, candidate.password);
  if (!passwordIsMatch) {
    return res.render("./pages/admin/login/login", {
      errors: ["Username or password wrong"],
    });
  }

  const payload = {
    id: candidate.id,
    role: candidate.role,
    username: candidate.username,
  };

  const JWTSecret = process.env.SECRET_KEY;
  const token = await generateToken(payload, JWTSecret, {
    algorithm: "HS512",
    expiresIn: "24h",
  });

  req.session.regenerate(function () {
    req.session.user = candidate;
    res.redirect(`/admin/`);
  });
});

exports.getLogin = (req, res, next) => {
  const validationErrors = validationResult(req);
  return res.status(200).render("./pages/admin/login/login", {
    errors: validationErrors.errors.map((e) => e),
  });
};
