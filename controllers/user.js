const User = require("../models/user");

//get users
const getUsers = (req, res) => {
  console.log("here");
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Server error while fetching users" });
    });
};

//creating a user

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Invalid user data" });
      }
      res.status(500).send({ message: "Server error while fetching users" });
    });
};

const getUserById = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Server error while fetching user" });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
};
