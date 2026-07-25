const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const path = require("path");

router.get("/add-product", productsController.getAddProduct);
router.post("/add-product", productsController.postAddProduct);
router.get("/products", productsController.getProducts);
module.exports = router;

