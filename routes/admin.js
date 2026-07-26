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
module.exports = router;

