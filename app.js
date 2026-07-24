const express = require("express");
const bodyParser = require("body-parser");
//const expressHbs = require("express-handlebars");
const app = express();
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));
//app.engine("hbs",expressHbs({layoutsDir:"views/layouts/",defaultLayout:"main-layout",extname:"hbs"}));
app.set("view engine","ejs");
app.set("views","views");
    

app.use("/admin",adminData.routes);
app.use(shopRoutes);


app.use((req, res, next) => {
    res.status(404).render("404",{pageTitle:"Not Found",path:"/"});
});
app.listen(3001); 
module.exports = app;

