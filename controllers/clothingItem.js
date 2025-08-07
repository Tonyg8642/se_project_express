const clothingItem = require("../models/clothingItem");
const ClothingItem = require("../models/clothingItem");

//main handler of all of my api calls. Line 5
//console.log(req.body) is when we work with a post. The "body" contains the majority of the data
//next, we extract the data out of the body on line 10. Start with const then the date in {}
//next, ClothingItem.create({name, wealther, imageURL}) is apart of the express
//ClothingItem.create({name, wealther, imageURL}) is a promise so use .then and return ((item))
const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, wealther, imageURL } = req.body;

  ClothingItem.create({ name, wealther, imageURL })
    .then((item) => {
      console.log("item");
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createItem", e });
    });
};

//This function connects to the "Read" route in clothingItem.js
const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getItems", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  clothingItem
    .findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from updateItem", e });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);

  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then(() => {
      res.status(204).send({ message: "Item deleted successfully" });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from deleteItem", e });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
