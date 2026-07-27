
const Product = require("../models/products");


// get products 
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {

        res.render("shop/products-list", { prods: products, pageTitle: "Shop", path: "/", });
    });
}
exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/index", { prods: products, pageTitle: "Shop", path: "/", });
    });
}
exports.getCart = (req, res, next) => {
    res.render("shop/cart", { pageTitle: "Cart", path: "/cart", });
}
exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout", });
}
exports.getOrders = (req, res, next) => {
    res.render("shop/orders", { 
        pageTitle: "Your Orders", 
        path: "/orders", 
    });
}