const express = require("express");
const router= express.Router();
const path = require("path");
const rootDir = require("../util/paths");
const adminData = require("./admin");
router.get("/",(req, res, next) => {
    
    const products = adminData.products;
res.render("shop",{prods:products,docTitle:"Shop",path:"/",shopActive:true,addProductActive:false,layout:"main-layout",productCss:true,formCss:false,errorCss:false});
});


module.exports = router;
