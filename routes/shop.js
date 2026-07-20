const express = require("express");
const router= express.Router();
const path = require("path");
const rootDir = require("../util/paths");
router.get("/",(req, res, next) => {
    
    console.log("In the middleware from last middleware");
res.sendFile( path.join(rootDir,"views","shop.html"));
});


module.exports = router;
