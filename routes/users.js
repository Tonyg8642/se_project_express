// 📁 routes/users.js

const express = require("express");
const { getCurrentUser, updateUser } = require("../controllers/user");

const router = express.Router();

// ---------- PROTECTED ROUTES (require JWT token) ----------
router.get("/me", getCurrentUser); // get current logged-in user
router.patch("/me", updateUser); // update user profile (name/avatar)

module.exports = router;
