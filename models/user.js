const getDb = require("../util/database").getDb;
const ObjectId = require("mongodb").ObjectId;
class User {
    constructor(
        username,email,cart,id
    ){
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }
    save(){
        const db =getDb;
        db.collection.insertOne(this).then((result) => {
            console.log("user created",result);
        }).catch((err) => {
            console.log(err);
        });
    }
    static findById(id){
        const db = getDb();
        return db.collection("users").findOne({_id: new ObjectId(id)}).then((user) => {
            return user;
        }).catch((err) => {
            console.log(err);
        });
    }
    addToCart(product){
        const cartProductIndex = this.cart.items.findIndex(cp => cp.productId.toString() === product._id.toString());
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        if(cartProductIndex >= 0){
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }else {
            updatedCartItems.push({productId:product._id,quantity:newQuantity});
        }
        const updatedCart = {items : updatedCartItems};
        const db = getDb();
        return db.collection("users").updateOne({_id : new ObjectId(this._id)},{$set:{cart:updatedCart}}).then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
    getCart(){
        const db = getDb();
        const productIds = this.cart.items.map(item => new ObjectId(item.productId));
        return db.collection("products").find({_id: {$in: productIds}}).toArray().then((products) => {
            return products.map(product => {
                return {...product, quantity: this.cart.items.find(item => item.productId.toString() === product._id.toString()).quantity};
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    deleteCartItem(productId){
        const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
        const updatedCart = {items : updatedCartItems};
        const db = getDb();
        return db.collection("users").updateOne({_id : new ObjectId(this._id)},{$set:{cart:updatedCart}}).then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
addOrder(){
    const db = getDb();
    return this.getCart().then((products)=>{
        const order = {items:products,user:{_id:new ObjectId(this._id),name:this.name},date:new Date()};
        return db.collection("orders").insertOne(order).then((result) => {
            this.cart = {items:[]};
            return db.collection("users").updateOne({_id : new ObjectId(this._id)},{$set:{cart:this.cart}}).then((result) => {
                return result;
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
}
getOrders(){
    const db = getDb();
    return db.collection("orders").find({'user._id': new ObjectId(this._id)}).toArray().then((orders) => {
        return orders;
    }).catch((err) => {
        console.log(err);
    });
}
}
module.exports = User;







// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");
// const User = sequelize.define(
//     "user",
//     {
//         id:{
//             type:Sequelize.INTEGER,
//             autoIncrement:true,
//             allowNull:false,
//             primaryKey:true,
//             unique:true
//         },
//         name:{
//             type:Sequelize.STRING,
//             allowNull:false
//         },
//         email:{
//             type:Sequelize.STRING,
//             allowNull:false,
//             unique:true
//         },
//         password:{
//             type:Sequelize.STRING,
//             allowNull:false
//         }
//     }
// )
// module.exports = User;