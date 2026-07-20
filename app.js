const http = require("http");
const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log("In the middleware from first middleware");
    res.send("<h1>Hello from Express from first middleware!</h1>");
    //next();
});

app.use((req, res, next) => {
    console.log("In another middleware from second middleware");
    res.send("<h1>Hello from Express from second middleware!</h1>");
});

const server = http.createServer(app);

server.listen(3001); 
module.exports = server;
