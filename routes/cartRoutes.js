const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");
router.post("/addcart", authMiddleware, cartController.addToCart);
router.delete("/deletecart", authMiddleware, cartController.deleteCart);
router.get("/getcart", authMiddleware, cartController.getCartDetails);
router.put("/update", authMiddleware, cartController.updateCartItemQuantity);
module.exports = router;
