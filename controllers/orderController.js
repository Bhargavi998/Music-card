const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {
  console.log("req.body placed order :", req.body);
  try {
    const { userId, userAddress, paymentMethod, items, totalPrice, images } =
      req.body;

    const newOrder = new Order({
      user: userId,
      items: items,
      userAddress: userAddress,
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
      images: images,
    });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.body.userId;

    const userOrders = await Order.find({ user: userId });

    if (!userOrders) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;
  console.log("orderId :", orderId);
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not FOund" });
    }

    res.json({ sucess: true, data: order });
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product" });
  }
};
