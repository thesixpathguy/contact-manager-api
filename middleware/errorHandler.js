const errorCodes = require("../constants/errorCodes");

const errorHandler = function (err, req, res, next) {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case errorCodes.VALIDATION_ERROR:
      res.json({
        title: "Validation failed",
        statusCode: statusCode,
        message: err.message,
        stack: err.stack,
      });
      break;
    case errorCodes.NOT_FOUND:
      res.json({
        title: "Not found",
        statusCode: statusCode,
        message: err.message,
        stack: err.stack,
      });
      break;
    case errorCodes.FORBIDDEN:
      res.json({
        title: "Forbidden",
        statusCode: statusCode,
        message: err.message,
        stack: err.stack,
      });
      break;
    case errorCodes.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        statusCode: statusCode,
        message: err.message,
        stack: err.stack,
      });
      break;
    case errorCodes.SERVER_ERROR:
      res.json({
        title: "server error",
        statusCode: statusCode,
        message: err.message,
        stack: err.stack,
      });
      break;
    default:
      console.log("no error. all is good.");
      break;
  }
};

module.exports = errorHandler;
