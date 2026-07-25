
const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {

    res.status(200).render("admin/add-product", { pageTitle: "Add Product", path: "/admin/add-product" });

}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/products-list", { prods: products, pageTitle: "Shop", path: "/", });
    });
}