const http = require("http");
const fs = require("fs");
const zlib = require("zlib");
const url = require("url");
http.createServer((req, res) => {
    let {
        pathname
    } = url.parse(req.url, true);
    let path = 'www' + pathname;
    fs.stat(path, (err, stat) => {
        if (err) {
            res.writeHead(404);
            res.write("not found");
            res.end();
        } else {
            let rs = fs.createReadStream(path);
            rs.on('error', err => {});
            res.setHeader('content-encoding', 'gzip');
            let gz = zlib.createGzip();
            rs.pipe(gz).pipe(res);
        }
    })
}).listen(8080);