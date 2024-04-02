const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  summary: String,
  color: {
    type: String,
  },
  headphoneType: {
    type: String,
  },
  about: [{ type: String }],
  availability: {
    type: String,
  },
  brand: String,
  starRating: {
    type: Number,
    min: 0,
    max: 5,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
