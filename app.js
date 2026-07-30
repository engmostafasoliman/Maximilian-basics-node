const express = require("express");
const bodyParser = require("body-parser");
//const expressHbs = require("express-handlebars");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const errorController = require("./controllers/errors");
const db = require("./util/database");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));
//app.engine("hbs",expressHbs({layoutsDir:"views/layouts/",defaultLayout:"main-layout",extname:"hbs"}));
app.set("view engine","ejs");
app.set("views","views");
    

app.use("/admin",adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);
app.listen(3001); 
db.execute("SELECT * FROM products").then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
module.exports = app;

