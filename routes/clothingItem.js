// routes/clothingItems.js

const express = require("express");

const {
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

const { validateCardBody, validateId } = require("../middlewares/validation");

const router = express.Router();

// create item
router.post("/", validateCardBody, createItem);

// delete item
router.delete("/:itemId", validateId, deleteItem);

// like item
router.put("/:itemId/likes", validateId, likeItem);

// unlike item
router.delete("/:itemId/likes", validateId, unlikeItem);

module.exports = router;