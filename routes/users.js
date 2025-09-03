// routes/users.js
const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/user");

// GET /users/me → return the logged-in user
router.get("/me", getCurrentUser);

// PATCH /users/me → update name & avatar
router.patch("/me", updateUser);

module.exports = router;
