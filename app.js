const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const errorController = require("./controllers/errors");
const sequelize = require("./util/database");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
app.set("views","views");
    

app.use("/admin",adminRoutes);

app.use(shopRoutes);
app.use(errorController.get404);

 sequelize.sync().then((result)=>{
    // console.log(result); 
    app.listen(3001); 
 }).catch((err)=>{
    console.log(err);
 }); 



module.exports = app;

