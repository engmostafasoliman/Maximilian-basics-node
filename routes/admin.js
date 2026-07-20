const express = require("express");
const router = express.Router();
router.get("/add-product",(req, res, next) => {
    
    console.log("In the middleware from add-product middleware");
   res.status(200).send("<form action='/admin/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>");

});
router.post("/product",(req, res, next) => {
    console.log(req.body);
    
    res.redirect("/");
});

module.exports = router;
/*
router.use("/add-product",(req, res, next) => {
    
    console.log("In the middleware from add-product middleware");
   res.send("<form action='/admin/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>");

});

router.post("/product",(req, res, next) => {
    console.log(req.body);
    
    res.redirect("/");
});
*/