const http = require("http");
const url = require("url");
http.createServer((req, res) => {
    let {
        pathname,
        query
    } = url.parse(req.url, true)
    console.log(pathname, query);
    res.end();
}).listen(8010);