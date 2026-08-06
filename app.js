const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const errorController = require("./controllers/errors");
const mongoConnect = require("./util/database");
const Product = require("./models/products");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cat-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
app.set("views","views");

app.use((req,res,next)=>{
    User.findByPk(1).then((user)=>{
        req.user = user;
        next();
    }).catch((err)=>{
        console.log(err);
    });
});
app.use("/admin",adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);
mongoConnect((client)=>{
    console.log(client);
    app.listen(3001); 
});
// Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
// User.hasMany(Product);
// Cart.belongsTo(User);
// User.hasOne(Cart);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });
// Product.belongsToMany(Order, { through: OrderItem });


// sequelize.sync().then((result)=>{
//     // console.log(result); 
//     return User.findByPk(1);
//  }).then((user)=>{
//     if(!user){
//         return User.create({name:"Mostafa Soliman",email:"developer@easytouchuae.ae",password:"123456"});
//     }
//     return user;
//  }).then((user)=>{
//     user.getCart().then((cart)=>{
//         if(!cart){
//             return user.createCart();
//         }
//         return cart;
//     }).then((cart)=>{
//         console.log("cart is : ",cart);
//     });
//     console.log("user is : ",user);
//    
//  }).catch((err)=>{
//     console.log(err);
//  }); 



module.exports = app;

