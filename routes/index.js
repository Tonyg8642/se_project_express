const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");

// Get current logged-in user
router.get("/me", getCurrentUser);

// Update current user (name + avatar)
router.patch("/me", updateUser);

module.exports = router;
