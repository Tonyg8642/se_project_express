const ClothingItem = require("../models/ClothingItem");

const {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
} = require("../utils/errors");
const { BAD_REQUEST_ERROR_CODE } = require("../utils/errors");

// main handler of all of my api calls. Line 5
// console.log(req.body) is when we work with a post. The "body" contains the majority of the data
// next, we extract the data out of the body on line 10. Start with const then the date in {}
// next, ClothingItem.create({name, wealther, imageURL}) is apart of the express
// ClothingItem.create({name, wealther, imageURL}) is a promise so use .then and return ((item))
const createItem = (req, res) => {

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL, owner : req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid user ID" });
      }
      console.error(e);
      res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Error from createItem", e });
    });
};

// This function connects to the "Read" route in ClothingItem.js
const getItems = (req, res) => {
  ClothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      console.error(e);
      res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Error from getItems", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem
    .findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Error from updateItem", e });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);

  ClothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then(() => {
      res.status(200).send({ message: "Item deleted successfully" });
    })
    .catch((e) => {
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
      console.error(e);
      res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Error from deleteItem", e });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem
    .findByIdAndUpdate(itemId, { $addToSet: { likes: userId } }, { new: true })
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
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
      console.error(e);
      res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Error from likeItem", e });
    });
};

const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem
    .findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true })
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
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
      console.error(e);
      res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Error from unlikeItem", e });
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
