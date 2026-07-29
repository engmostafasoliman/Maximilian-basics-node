
const Product = require("../models/products");
const Cart = require("../models/cart");


// get products 
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {

        res.render("shop/products-list", { prods: products, pageTitle: "Shop", path: "/", });
    });
}
//get product
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId);
    Product.findById(prodId,(product) => {
       res.render("shop/product-details", { product: product    , pageTitle: product.title, path: "/products", });
    });
}
//get index
exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/index", { prods: products, pageTitle: "Shop", path: "/", });
    });
}
//get cart
exports.getCart = (req, res, next) => {
    res.render("shop/cart", { pageTitle: "Cart", path: "/cart", });
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