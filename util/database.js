const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const mongoURI = "mongodb+srv://devmostafasoliman_db_user:TvL2qEKQsoLuTR1a@cluster0.hqnkpd7.mongodb.net/?appName=Cluster0";

const mongoClient = callback=> MongoClient.connect(mongoURI)
.then((client)=>{
    console.log("Connected successfully to server");
    callback(client);
}).catch((err)=>{
    console.log(err);
});



module.exports = mongoClient;
