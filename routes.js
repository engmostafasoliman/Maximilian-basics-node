const fs = require("fs");
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
if (url === "/") {
        res.write("<html>");
        res.write("<head><title>Enter message </title></head>");
        res.write("<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>");
        res.write("</html>");
        return res.end();
    }
    if (url === "/message" && req.method === "POST") {
        const body = [];
        req.on("data", (data) => {
            console.log(data);
            body.push(data);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync("message.txt", message);
        })
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();   
    }
    res.statusCode = 200;
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello first node js server</h1></body>");
    res.write("</html>");

    res.end();
}

/*    module.exports = {
        handler:requestHandler,
        someText:"Hello from the module"
    };*/

exports.handler = requestHandler;    
exports.someText = "Hello from the module";