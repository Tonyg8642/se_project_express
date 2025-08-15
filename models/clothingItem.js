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
    enum: ['hot', 'warm', 'cold']
    //An enum validator is a rule that limits a field’s value to a specific list of allowed options.
    //In this case, the weather field can only be 'hot', 'warm', or 'cold'.
    //It’s like saying: “Choose only from this specific list.”

  },
  imageURL: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',        // reference to User model
      required: true      // ensures every item is associated with a user
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',        // references users who liked the item
      default: []         // starts as an empty array
    },
    createdAt: {
      type: Date,
      default: Date.now   // automatically sets creation timestamp
    },
  },
});

module.exports = mongoose.model("clothingItems", clothingItemSchema);
