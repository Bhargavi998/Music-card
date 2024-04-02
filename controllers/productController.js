const Product = require("../models/Product");
const mongoose = require("mongoose");
exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
};

exports.searchProductsByName = async (req, res) => {
  const { productName } = req.query;
  try {
    const products = await Product.find({
      name: { $regex: new RegExp(productName, "i") },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.filterAndSortProducts = async (req, res) => {
  const { headphonesType, company, color, price, sortBy } = req.query;
  console.log("Filtering and sorting products...", req.query);
  let filter = {};
  let sortQuery = {};

  // Applying filters
  if (headphonesType) filter.headphoneType = headphonesType;
  if (company) filter.brand = company;
  if (color) filter.color = color;
  if (price) {
    const [minPrice, maxPrice] = price.split("-");
    filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
  }

  // Applying sorting
  if (sortBy === "priceLowest") {
    sortQuery.price = 1;
  } else if (sortBy === "priceHighest") {
    sortQuery.price = -1;
  } else if (sortBy === "nameAZ") {
    sortQuery.name = 1;
  } else if (sortBy === "nameZA") {
    sortQuery.name = -1;
  }

  try {
    const products = await Product.find(filter)
      .collation({ locale: "en", strength: 2 })
      .sort(sortQuery);
    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to filter and sort products" });
  }
};

exports.sortProducts = async (req, res) => {
  const { sortBy } = req.query;
  let sortQuery = {};
  if (sortBy === "priceLowest") {
    sortQuery.price = 1;
  } else if (sortBy === "priceHighest") {
    sortQuery.price = -1;
  } else if (sortBy === "nameAZ") {
    sortQuery.name = 1;
  } else if (sortBy === "nameZA") {
    sortQuery.name = -1;
  }

  try {
    const products = await Product.find()
      .collation({ locale: "en", strength: 2 })
      .sort(sortQuery);
    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to sort products" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};
exports.getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not FOund" });
    }

    res.json({ sucess: true, data: product });
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product" });
  }
};
