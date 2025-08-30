const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems"); // make sure file name matches!

// GET /items → return all clothing items (public)
router.get("/", getItems);

// POST /items → create a new clothing item (protected)
router.post("/", createItem);

// DELETE /items/:itemId → delete an item if current user is the owner
router.delete("/:itemId", deleteItem);

// PUT /items/:itemId/likes → like an item
router.put("/:itemId/likes", likeItem);

// DELETE /items/:itemId/likes → unlike an item
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
