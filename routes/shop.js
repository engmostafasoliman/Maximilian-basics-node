const express = require("express");
const router= express.Router();


router.get("/",(req, res, next) => {
    
    console.log("In the middleware from last middleware");
   res.send("<h1>Hello shop</h1>");

});


module.exports = router;
