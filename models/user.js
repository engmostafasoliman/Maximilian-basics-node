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
        const cartProductIndex = this.cart.items.findIndex(cp => cp.productId === product._id);
        let newQuantity = 1;
        let updatedCart = {items : [{productId:product._id,quantity:1}]};
        if(cartProductIndex >= 0){
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCart = {items : [{productId:product._id,quantity:newQuantity}]};
        }else {
            updatedCartItems.push({productId:product._id,quantity:newQuantity});
        }
        const updatedCartItems = [...this.cart.items];
        updatedCartItems[cartProductIndex].quantity = newQuantity;
        const db = getDb();
        return db.collection("users").updateOne({_id : this._id},{$set:{cart:updatedCart}}).then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
    getCart(){
        const db = getDb();
        return db.collection("users").findOne({_id: new ObjectId(this._id)}).then((user) => {
            return user.cart;
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