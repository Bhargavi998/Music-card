const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

const authMiddleware = require("../middlewares/authMiddleware");
router.post("/placeorder", authMiddleware, orderController.placeOrder);
router.get("/getorder", authMiddleware, orderController.getUserOrders);
router.get("/:orderId", authMiddleware, orderController.getOrderById);

module.exports = router;
