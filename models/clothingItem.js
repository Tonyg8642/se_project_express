const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ['hot', 'warm', 'cold'], // An enum validator limits values to a specific list
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not valid",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true, // Ensures every item is associated with a user
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User", // References users who liked the item
    default: [], // Starts as an empty array
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets creation timestamp
  },
});

module.exports = mongoose.model("ClothingItem", clothingItemSchema);
