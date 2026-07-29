const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(process.mainModule.filename), "data", "cart.json");

const getCartFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        else {
            cb(JSON.parse(fileContent));
        }
    });
}
module.exports = class Cart {
    constructor() {
        this.products = [];
        this.totalPrice = 0;
    }

    static addProduct(id,productPrice) {

        fs.readFile(p, (err, fileContent) => {
            let cart = {products:[],totalPrice:0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            
            let exisitingProductIndex = cart.products.findIndex(p=>p.id===id);
            let exisitingProduct = cart.products[exisitingProductIndex];
            let updatedProduct
            if(exisitingProduct){
                 updatedProduct = {...exisitingProduct};
                updatedProduct.qty++;
                cart.products = [...cart.products];
                cart.products[exisitingProductIndex] = updatedProduct;
                
            }else{ 
                updatedProduct = {id:id,qty:1};
                cart.products = [...cart.products,updatedProduct];
            }
            
            cart.totalPrice += +productPrice;

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);

            });
        });
    }
    static getCart(cb) {
        
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            else {
                cb(JSON.parse(fileContent));
            }
        });
    }
    static saveCart(cart) {
        fs.writeFile(p, JSON.stringify(cart), (err) => {
            console.log(err);
        });
    }
    static deleteCart(id,cb){
        getCartFromFile((cart)=>{
            const updatedCart = cart.filter(p=>p.id!==id);
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        });
    }
    static deleteProduct(id,price){
        fs.readFile(p,(err,fileContent)=>{
            if(err){
                return;
            }

            const updatedCart = JSON.parse(fileContent);
            const product = updatedCart.products.find(p=>p.id===id);
            if(!product){
                // product isn't in the cart, nothing to remove
                console.log("product not found in cart");
                return;
            }
            const productQty = product.qty;
            updatedCart.totalPrice = updatedCart.totalPrice - price*productQty;
            updatedCart.products = updatedCart.products.filter(p=>p.id!==id);
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        });

       
    }  
    

}