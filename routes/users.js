// 📁 routes/users.js

// Import Express so we can create route endpoints.
const express = require("express");

// Import controller functions that actually DO the work.
// getCurrentUser → returns data about the logged-in user
// updateUser → updates the user's name and avatar
const { getCurrentUser, updateUser } = require("../controllers/user");

// Import the Joi validator for PATCH /me.
// validateUserUpdate will check:
//   - name is 2–30 characters
//   - avatar is a valid URL
const { validateUserUpdate } = require("../middlewares/validation");

// Create a router object so we can define the routes cleanly.
const router = express.Router();

// --------------------------------------------------------
// 🔐 PROTECTED ROUTES (The user MUST be logged in)
// These routes rely on auth middleware in app.js
// --------------------------------------------------------

// GET /users/me
// When the user hits this route, we return their own profile.
// Example: { name, email, avatar, _id }
router.get("/me", getCurrentUser);

// PATCH /users/me
// This lets a logged-in user change their profile info.
// We FIRST run validateUserUpdate to make sure the info is clean.
// Then, if valid, we run updateUser to save it to the database.
router.patch("/me", validateUserUpdate, updateUser);
//             │           │
//             │           └─ Runs only if Joi validation passes
//             └─ Checks the request body (name + avatar)

// Export the router so app.js can use it.
module.exports = router;
