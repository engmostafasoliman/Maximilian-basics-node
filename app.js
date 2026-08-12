const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const errorController = require("./controllers/errors");
const mongoConnect = require("./util/database").mongoClient;
const { MongoClient } = require("mongodb");
// const Product = require("./models/products");
const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cat-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
app.set("views","views");

app.use((req,res,next)=>{
    User.findById("6a7bfdded0c8da5892f0ca58").then((user)=>{
        req.user = user;
        next();
    }).catch((err)=>{
        console.log(err);
    });
});
app.use("/admin",adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);
mongoConnect(()=>{    
    app.listen(3001); 
});

module.exports = app;

