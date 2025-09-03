const ClothingItem = require("../models/clothingItem");

const {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
} = require("../utils/errors");

// Create a new clothing item
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      console.error(e); // log the error for debugging
      if (e.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid item data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Error from createItem" });
    });
};

// Get all clothing items
const getItems = (req, res) =>
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((e) => {
      console.error(e);
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Error from getItems" });
    });

// Update a clothing item's image
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $set: { imageUrl } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      console.error(e);
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Error from updateItem", e });
    });
};

// Delete a clothing item (only if owner matches current user)
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const currentUserId = req.user._id;

  return ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item) {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: "Item Not Found" });
      }

      if (item.owner.toString() !== currentUserId) {
        return res
        .status(FORBIDDEN_ERROR_CODE)
          .send({ message: "Forbidden: You cannot delete another user's item" });
      }

      return item.deleteOne().then(() =>
        res.status(200).send({ message: "Item deleted successfully" })
      );
    })
    .catch((e) => {
      console.error(e);
      if (e.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: "Item Not Found" });
      }
      if (e.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Error from deleteItem" });
    });
};

// Like a clothing item
const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      console.error(e);
      if (e.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: "Item Not Found" });
      }
      if (e.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Error from likeItem" });
    });
};

// Unlike a clothing item
const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      console.error(e);
      if (e.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: "Item Not Found" });
      }
      if (e.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Error from unlikeItem" });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
