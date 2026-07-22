const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/paths");
const products = [];
router.get("/add-product",(req, res, next) => {
    
    console.log("In the middleware from add-product middleware");
   res.status(200).render("add-product");

});
router.post("/product",(req, res, next) => {
    console.log(req.body);
    products.push({title:req.body.title});
    res.redirect("/");
});

exports.routes = router;
exports.products = products;

