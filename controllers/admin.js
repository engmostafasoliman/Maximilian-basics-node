
const Product = require("../models/products");
exports.getAddProduct = (req, res, next) => {
    res.status(200).render("admin/edit-product", { pageTitle: "Add Product", path: "/admin/add-product",editing:false});

}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageurl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title,imageUrl,price,description);
    product.save().then((result) => {
        console.log("created");
        res.redirect("/admin/products");
    }).catch((err) => {
        console.log(err);
    });
}

// exports.getProducts = (req, res, next) => {
//     Product.findAll().then((rows) => {
//         res.render("admin/products", { prods: rows, pageTitle: "Admin Products", path: "/admin/products", });
//     }).catch((err) => {
//         console.log(err);
//     });
// }

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageurl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    req.user.getProducts({where:{id:prodId}}).then((products) => {
        const product = products[0];
        product.title = updatedTitle;
        product.imageUrl = updatedImageUrl;
        product.price = updatedPrice;
        product.description = updatedDescription;
        return product.save();
    }).then(() => {
        console.log("updated");
        res.redirect("/admin/products");
    }).catch((err) => {
        console.log(err);
    });}
    
    
// }
// exports.getEditProduct = (req, res, next) => {
//     const editMode = req.query.edit;
//     if(!editMode){
//         return res.redirect("/");
//     }
//     const prodId = req.params.productId;
//     if(!prodId){
//         return res.redirect("/");
//     }

//     Product.findByPk(prodId).then((product) => {
//         res.render("admin/edit-product",
//              { product: product,
//              pageTitle: "Edit Product",
//              path: "/admin/edit-product",
//             editing : editMode
//          });
//     }).catch((err) => {
//         console.log(err);
//     });
// }
// exports.postDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     req.user.getProducts({where:{id:prodId}}).then((products) => {
//         const product = products[0];
//         product.destroy();
//     }).then(() => {
//         console.log("deleted");
//         res.redirect("/admin/products");
//     }).catch((err) => {
//         console.log(err);
//     });
// }


