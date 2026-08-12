const getDb = require("../util/database").getDb;
const ObjectId = require("mongodb").ObjectId;

class Product {
    constructor(title, imageUrl, price, description,id ) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this._id = id ;
    }
    save() {
        const db = getDb();
        let dbOperation;
        if(this._id){
            
            //update
            dbOperation = db.collection("products").updateOne({_id: new ObjectId(this._id)},{$set:this})
        }
        else{
            //insert
            dbOperation = db.collection("products").insertOne(this)
        }
        return dbOperation.then((result) => {
               
                console.log("product updated",result);
            }).catch((err) => {
                console.log(err);
            });
        
        
    }
    
    static fetchAll() {
        const db = getDb();
        return db.collection("products").find().toArray().then((products) => {
            return products;
        }).catch((err) => {
            console.log(err);
        });
    }
    static  findById(prodId){
        const db = getDb();
        return db.collection("products").find({_id: new ObjectId(prodId)}).next().then((product) => {
            return product;
        }).catch((err) => {
            console.log(err);
        });
    }
    static deleteById(prodId){
        const db = getDb();
        return db.collection("products").deleteOne({_id: new ObjectId(prodId)}).then((result) => {
            console.log("deleted",result);
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
}
module.exports = Product;



// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");
// const Product = sequelize.define("product",{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     title:Sequelize.STRING,
//     price:{
//         type:Sequelize.DOUBLE,
//         allowNull:false
//     },
//     imageUrl:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// });
// module.exports = Product;