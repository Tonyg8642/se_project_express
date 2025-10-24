// 📁 routes/clothingItems.js

const express = require("express");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");

const router = express.Router();

// ---------- PUBLIC ROUTE ----------
// View all clothing items (no auth required)
router.get("/", getItems);

// ---------- PROTECTED ROUTES ----------
// Everything below requires a valid JWT
router.use(auth);

// Add a new clothing item
router.post("/", createItem);

// Delete a clothing item by ID
router.delete("/:itemId", deleteItem);

// Like a clothing item
router.put("/:itemId/likes", likeItem);

// Unlike a clothing item
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
