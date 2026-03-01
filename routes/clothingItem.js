// 📁 routes/clothingItems.js

const express = require("express");

// Import controllers
const {
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

// Import validation middleware
const { validateCardBody, validateId } = require("../middlewares/validation");

const router = express.Router();

// Create item
router.post("/", validateCardBody, createItem);

// Delete item
router.delete("/:itemId", validateId, deleteItem);

// Like item
router.put("/:itemId/likes", validateId, likeItem);

// Unlike item
router.delete("/:itemId/likes", validateId, unlikeItem);

module.exports = router;