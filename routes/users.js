const router = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/user');

// Route to get all users
router.get("/users", getUsers);

// Route to get a single user by ID
router.get("/getUser/:id", getUserById);

// Route to create a new user
router.post("/users", createUser);

module.exports = router;