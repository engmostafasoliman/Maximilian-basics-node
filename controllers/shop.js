
const Product = require("../models/products");
const Cart = require("../models/cart");


// get products 
exports.getProducts = (req, res, next) => {
    Product.findAll().then((products) => {
             res.render("shop/products-list", { prods: products, pageTitle: "Shop", path: "/", });

    }).catch((err) => {
        console.log(err);
    });
}
//get product
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId);
    Product.findByPk(prodId).then((product) => {
        console.log(" product ",product);
          res.render("shop/product-details", { product: product, pageTitle: product.title, path: "/products", });
    }).catch((err) => {
        console.log(err);
    });
}
//get index 
exports.getIndex = (req, res, next) => {
    Product.findAll().then((products) => {
      res.render("shop/index", { prods: products, pageTitle: "Shop", path: "/", });
    }).catch((err) => {
        console.log(err);
    });
      
}
//get cart
exports.getCart = (req, res, next) => {
    req.user.getCart().then((cart)=>{
        return cart.getProducts();
    }).then((products)=>{
        console.log(products);
        res.render("shop/cart", { pageTitle: "Cart", path: "/cart", products:products});
    }).catch((err)=>{
        console.log(err);
    });
 
}
//get checkout
exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout", });
}
//get orders
exports.getOrders = (req, res, next) => {
    res.render("shop/orders", { 
        pageTitle: "Your Orders", 
        path: "/orders", 
    });
}
exports.postCart = (req, res, next) => {
    
    const prodId = req.body.productId;
    console.log(prodId);
    Product.findById(prodId,(product) => {
        Cart.addProduct(prodId,product.price);
    });
    res.redirect("/cart");
}
exports.postCartDeleteItem = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId,(product) => {
        Cart.deleteProduct(prodId,product.price);
        res.redirect("/cart");

    });
    
}