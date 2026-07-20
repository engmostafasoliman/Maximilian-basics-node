const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/paths");
router.get("/add-product",(req, res, next) => {
    
    console.log("In the middleware from add-product middleware");
   res.status(200).sendFile( path.join(rootDir,"views","add-product.html"));

});
router.post("/product",(req, res, next) => {
    console.log(req.body);
    
    res.redirect("/");
});

module.exports = router;
