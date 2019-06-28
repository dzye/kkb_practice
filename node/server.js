const http = require("http");
http.createServer((req, res) => {
    console.log(req);
    res.write("aaa");
    res.end();
}).listen(8010);