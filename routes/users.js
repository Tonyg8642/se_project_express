const router = require("express").Router();
const { getUsers, getUserById, createUser } = require("../controllers/user");

// Route to get all users
router.get("/", getUsers);

// Route to get a single user by ID
router.get("/:id", getUserById);

// Route to create a new user
router.post("/", createUser);

module.exports = router;
