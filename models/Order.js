const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});
const orderItemSchema = new mongoose.Schema({
  product: productSchema,
  quantity: {
    type: Number,
    default: 1,
  },
  _id: {
    type: String,
  },
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [orderItemSchema],
  userAddress: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },

  // Add any other fields you want to store for each order
});

module.exports = mongoose.model("Order", orderSchema);
