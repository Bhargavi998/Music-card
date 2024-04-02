const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");
const mongoose = require("mongoose");

exports.addToCart = async (req, res) => {
  console.log("req :", req.body);
  const { productId, userId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      const newCart = new Cart({ user: userId });
      await newCart.save();
      cart = newCart; // Assign the newly created cart to the 'cart' variable
    }

    const existingCartItem = cart.items.find((item) =>
      item.product.equals(productId)
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity }); // Include the quantity when adding a new item
    }

    await cart.save();

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteCart = async (req, res) => {
  const { userId } = req.body;
  console.log("req.body :", req.body);

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await cart.deleteOne();

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCartDetails = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.json({ message: "Cart not found" });
    }

    let totalPrice = 0;
    let totalQuantity = 0;

    for (const item of cart.items) {
      const product = item.product;
      const quantity = item.quantity || 1;

      totalPrice += product.price * quantity;
      totalQuantity += quantity;
    }

    res.status(200).json({
      items: cart.items,
      totalPrice,
      totalQuantity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateCartItemQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update the quantity of the cart item
    cart.items[cartItemIndex].quantity = quantity;

    await cart.save();

    res
      .status(200)
      .json({ message: "Cart item quantity updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
