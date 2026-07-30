
const Product = require("../models/products");
exports.getAddProduct = (req, res, next) => {
    res.status(200).render("admin/edit-product", { pageTitle: "Add Product", path: "/admin/add-product",editing:false});

}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageurl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price);
    product.save().then(() => {
        res.redirect("/");
    }).catch((err) => {
        console.log(err);
    });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(([rows]) => {
        res.render("admin/products", { prods: rows, pageTitle: "Admin Products", path: "/admin/products", });
    }).catch((err) => {
        console.log(err);
    });
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageurl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const product = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    product.save().then(() => {
       res.redirect("/admin/products");
    }).catch((err) => {
        console.log(err);
    });
    
}
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    if(!prodId){
        return res.redirect("/");
    }

    Product.findById(prodId).then(([product]) => {
        res.render("admin/edit-product",
             { product: product[0],
             pageTitle: "Edit Product",
             path: "/admin/edit-product",
            editing : editMode
         });
    });
}
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect("/admin/products");
}


