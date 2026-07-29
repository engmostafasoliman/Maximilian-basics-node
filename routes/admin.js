const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const path = require("path");
//get admin products
router.get("/products", adminController.getProducts);
//get add product
router.get("/add-product", adminController.getAddProduct);
//post admin product
router.post("/add-product", adminController.postAddProduct);
//get edit product
router.get("/edit-product/:productId",adminController.getEditProduct);
//post edit product
router.post("/edit-product",adminController.postEditProduct);
module.exports = router;

