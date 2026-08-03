
const Product = require("../models/products");
const Order = require("../models/order");


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
    req.user.getOrders( {include :"products"}).then((orders)=>{
        console.log(orders);
        res.render("shop/orders", {
            pageTitle: "Your Orders",
            path: "/orders",
            orders: orders,
        });
    }).catch((err)=>{
        console.log(err);
    });
}
exports.postCart = (req, res, next) => {
    
    const prodId = req.body.productId;
    let fetchedCart;
   let newQuantity = 1;
    console.log(prodId);
    req.user.getCart().then((cart)=>{
        fetchedCart = cart;
        return cart.getProducts({where:{id:prodId}});
    }).then((products)=>{
        let product;
        if(products.length>0){
            product = products[0];
        } 
        
        if(product){
            newQuantity = product.cartItem.quantity + 1;
            return product;
        }

        return Product.findByPk(prodId);
    }).then((product)=>{
            return fetchedCart.addProduct(product,{through:{quantity:newQuantity}});
        }).then(()=>{
           res.redirect("/cart");
        }).catch((err)=>{
        console.log(err);
    });
}
exports.postCartDeleteItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart().then((cart)=>{
        return cart.getProducts({where:{id:prodId}});
    }).then((products)=>{
        const product = products[0];
        product.cartItem.destroy();
        res.redirect("/cart");
    }).catch((err)=>{
        console.log(err);
    });
    
}
exports.postOrder = (req,res,next)=>{
    let fetchedCart;
    req.user.getCart().then((cart)=>{
        fetchedCart = cart;
        return cart.getProducts();
    }).then((products)=>{
        return req.user.createOrder().then((order)=>{
            order.addProducts(products.map((product)=>{
                product.orderItem = {quantity:product.cartItem.quantity};
                return product;
            }));
        }).catch((err)=>{
            console.log(err);
        }).then((result)=>{
            console.log(result);
            return fetchedCart.setProducts(null);
        }).then(()=>{
            res.redirect("/orders");
        });
        
    }).catch((err)=>{
        console.log(err);
    });
}