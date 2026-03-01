const winston = require("winston");
const expressWinston = require("express-winston");

// ✅ Custom readable format
const messageFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) =>
    `${timestamp} ${level}: ${stack || message}`
);

// ---------- REQUEST LOGGER ----------
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: "request.log",
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    messageFormat // ✅ USE custom format here
  ),
});

// ---------- ERROR LOGGER ----------
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "error.log",
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }), // keeps stack traces
    messageFormat
  ),
});

// ----------------------------------
module.exports = {
  requestLogger,
  errorLogger,
};