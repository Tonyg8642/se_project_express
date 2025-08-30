const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");

// Get current user
router.get("/me", getCurrentUser);

// Update current user
router.patch("/me", updateUser);

module.exports = router;
