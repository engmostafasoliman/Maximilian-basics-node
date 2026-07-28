const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(process.mainModule.filename), "data", "cart.json");
module.exports = class Cart {
    constructor() {
        this.products = [];
        this.totalPrice = 0;
    }






    static addProduct(id) {

        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            else {
                cb(JSON.parse(fileContent));
            }
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

}