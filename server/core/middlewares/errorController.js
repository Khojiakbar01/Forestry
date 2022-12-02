const AppError = require("../utils/AppError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};
const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    errors: err.errors,
    message: err.message,
  });
};

const errorController = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "dev") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "prod") {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      let error = Object.create(err);
      if (error.name === "SequelizeDatabaseError") {
        if (err.original.code === "22P02") {
          error = new AppError("Cast error", 400);
        }
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        if (error.original.code === "23505") {
          error = new AppError(
            `The value with this key ${err.parameters[0]} already exists`,
            400
          );
        }
      }
      if (error.name === "validationError") {
        const formattedError = [...error.errors].map((e) => e.msg);

        error.errors = formattedError;
      }
      if (error.name === "TokenExpiredError") {
        error = new AppError(`Your token has expired`, 401);
      }

      sendErrorProd(error, res);
    }
  }
  // if (err.original.code === '22P02') {
  //     err = new AppError('Cast error', 400)
  // }
};

module.exports = errorController;
