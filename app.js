const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","pug");
app.set("views","views");
    

app.use("/admin",adminData.routes);
app.use(shopRoutes);


app.use((req, res, next) => {
    res.status(404).render("404");
});
app.listen(3001); 
module.exports = app;

