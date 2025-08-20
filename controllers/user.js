const User = require("../models/user");
const {
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
} = require("../utils/errors");

// Get all users
const getUsers = (req, res) =>
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Server error while fetching users" });
    });

// Create a new user
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  return User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
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

// Get a user by ID
const getUserById = (req, res) => {
  const userId = req.params.id;

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
      console.error(err); // eslint-disable-line no-console
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid user ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Server error while fetching user" });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
};
