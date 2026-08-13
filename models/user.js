const getDb = require("../util/database").getDb;
const ObjectId = require("mongodb").ObjectId;
class User {
    constructor(
        username,email,
    ){
        this.name = username;
        this.email = email;
        
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
            console.log(user);
            return user;
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