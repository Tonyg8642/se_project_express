// 📁 middlewares/auth.js

const jwt = require("jsonwebtoken");
const { UNAUTHORIZED_ERROR_CODE } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // ✅ Ensure token exists and starts with "Bearer "
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    // ✅ Verify the token using JWT secret
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .send({ message: "Invalid or expired token" });
  }

  req.user = payload; // ✅ attach user data to request
  next(); // ✅ move to next handler (controller)
};
