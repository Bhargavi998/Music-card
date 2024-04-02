const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
router.get("/all", productController.getAllProducts);
router.post("/add", productController.addProduct);
router.get("/search", productController.searchProductsByName);
router.get("/filter", productController.filterAndSortProducts);
router.get("/sort", productController.sortProducts);
router.get("/:productId", productController.getProductById);

module.exports = router;
