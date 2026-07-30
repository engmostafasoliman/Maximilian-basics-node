
const Product = require("../models/products");
const Cart = require("../models/cart");


// get products 
exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(([rows]) => {
             res.render("shop/products-list", { prods: rows, pageTitle: "Shop", path: "/", });

    }).catch((err) => {
        console.log(err);
    });
}
//get product
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId);
    Product.findById(prodId).then(([product]) => {
          res.render("shop/product-details", { product: product[0], pageTitle: product[0].title, path: "/products", });
    }).catch((err) => {
        console.log(err);
    });
}
//get index 
exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(([rows,fieldData]) => {
      res.render("shop/index", { prods: rows, pageTitle: "Shop", path: "/", });
    }).catch((err) => {
        console.log(err);
    });
      
}
//get cart
exports.getCart = (req, res, next) => {
    Cart.getCart((cart)=>{
    
    Product.fetchAll((products)=>{
        const cartProducts = [];

            for(product of products){
                const cartProductData = cart.products.find(p=>p.id===product.id);
                if(cartProductData){
                    cartProducts.push({productData :product,qty:cartProductData.qty});
                    
               
            }
            
        
        }
        res.render("shop/cart", { pageTitle: "Cart", path: "/cart", products:cartProducts});

    });
       

    })
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