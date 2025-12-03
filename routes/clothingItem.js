// 📁 routes/clothingItems.js

const express = require("express");

// Import controllers
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem"); // <-- corrected filename

// Import validation middleware
const { validateCardBody, validateId } = require("../middlewares/validation");

const router = express.Router();

// GET all items
router.get("/", getItems);

// Create item
router.post("/", validateCardBody, createItem);

// Delete item
router.delete("/:itemId", validateId, deleteItem); // <-- corrected param name

// Like item
router.put("/:itemId/likes", validateId, likeItem); // <-- corrected param name

// Unlike item
router.delete("/:itemId/likes", validateId, unlikeItem); // <-- corrected param name

module.exports = router;
