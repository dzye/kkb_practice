const http = require("http");
const fs = require("fs");
http.createServer((req, res) => {
    fs.readFile(`www${req.url}`, (err, data) => {
        if (err) {
            res.writeHeader("404");
            res.write("NOT FOUND");
        } else {
            res.write(data);
        }
        res.end();
    })
}).listen(8010);