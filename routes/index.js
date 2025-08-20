const express = require("express");

const router = express.Router();
const clothingItem = require("./clothingItem");
const user = require("./users");

// Mount routers
router.use("/items", clothingItem);
router.use("/users", user);

// Handle unknown routes
router.use((req, res) => {
  res.status(404).send({ message: "Not Found" });
});

module.exports = router;
