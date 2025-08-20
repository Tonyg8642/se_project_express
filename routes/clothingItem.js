const router = require("express").Router();
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

// Create a new clothing item
router.post("/", createItem);

// Get all clothing items
router.get("/", getItems);

// Update a clothing item (optional if needed in future)
router.put("/:itemId", updateItem);

// Delete a clothing item
router.delete("/:itemId", deleteItem);

// Like a clothing item
router.put("/:itemId/likes", likeItem);

// Unlike a clothing item
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
