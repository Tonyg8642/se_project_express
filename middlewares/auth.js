// 📁 middlewares/auth.js

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Ensure token exists and starts with "Bearer "
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // removed console.error for ESLint compliance
    return next(new UnauthorizedError("Invalid or expired token"));
  }

  req.user = payload; // attach decoded token to request

  return next(); // ensure a return to satisfy consistent-return
};
