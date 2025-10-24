// 📁 controllers/users.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  CONFLICT_ERROR_CODE,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// ---------- CREATE USER (SIGNUP) ----------
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  // ✅ Validate required fields
  if (!name || !avatar || !email || !password) {
    return res
      .status(BAD_REQUEST_ERROR_CODE)
      .send({ message: "All fields (name, avatar, email, password) are required" });
  }

  // ✅ Hash password before saving
  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      // Remove password from response
      const userObj = user.toObject();
      delete userObj.password;
      return res.status(201).send(userObj);
    })
    .catch((err) => {
      console.error("❌ Error creating user:", err);

      if (err.code === 11000) {
        return res
          .status(CONFLICT_ERROR_CODE)
          .send({ message: "Email already exists" });
      }

      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid user data" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Server error while creating user" });
    });
};

// ---------- GET CURRENT LOGGED-IN USER ----------
const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: "User not found" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error("❌ Error fetching current user:", err);
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Server error while fetching current user" });
    });
};

// ---------- UPDATE USER PROFILE ----------
const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: "User not found" });
      }
      return res.send(user);
    })
    .catch((err) => {
      console.error("❌ Error updating user:", err);

      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid data provided" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Server error while updating user" });
    });
};

// ---------- LOGIN USER ----------
const login = (req, res) => {
  const { email, password } = req.body;

  // ✅ Check for missing fields
  if (!email || !password) {
    return res
      .status(BAD_REQUEST_ERROR_CODE)
      .send({ message: "Email and password are required" });
  }

  // ✅ Find user and validate credentials
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // ✅ Generate JWT token (7-day expiry)
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
      return res.send({ token });
    })
    .catch((err) => {
      console.error("❌ Login error:", err);

      if (err.message === "Incorrect email or password") {
        return res
          .status(UNAUTHORIZED_ERROR_CODE)
          .send({ message: "Incorrect email or password" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Server error during login" });
    });
};

// ---------- EXPORTS ----------
module.exports = {
  createUser,
  getCurrentUser,
  updateUser,
  login,
};
