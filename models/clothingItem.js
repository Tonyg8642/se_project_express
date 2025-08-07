const mongoose = require("mongoose");
const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not",
    },
  },
});

module.exports = mongoose.model('clothingItems', clothingItemSchema);
