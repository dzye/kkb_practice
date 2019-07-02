const http = require("http");
const json = {
    'http://localhost:8081': true,
}
http.createServer((req, res) => {
    // if (json[req.headers.host]) {
    res.setHeader("access-control-allow-origin", "*");
    // }
    res.end();
}).listen(8081);