const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const zlib = require('zlib');
const {
    Form
} = require('multiparty');
const {
    HTTP_PORT,
    HTTP_ROOT,
    HTTP_UPLOAD
} = require('../config');
const {
    addRouter,
    findRouter
} = require('./router');

http.createServer((req, res) => {
    async function handle(method, url, get, post, files) {
        let fn = findRouter(method, url);
        if (!fn) {
            let filepath = HTTP_ROOT + url;
            fs.stat(filepath, (err, stat) => {
                if (err) {
                    res.writeHead(404);
                    res.write('not found');
                    res.end();
                } else {
                    let rs = fs.createReadStream(filepath);
                    let gz = zlib.createGzip();
                    rs.on('error', () => {});
                    res.setHeader('content-encoding', 'gzip');
                    rs.pipe(gz).pipe(res)
                }
            })
        } else {
            try {
                await fn(res, get, post, files);
            } catch (e) {
                res.writeHead(500);
                res.write("服务器内部错误");
                res.end();
            }
        }
    }

    let {
        pathname,
        query
    } = url.parse(req.url, true);

    if (req.method == 'POST') {
        if (req.headers['content-type'].startsWith('application/x-www-form-urlencoded')) {
            let arr = [];
            req.on('data', buffer => {
                arr.push(buffer);
            })
            req.on('end', () => {
                let post = querystring.parse(Buffer.concat(arr).toString());
                handle(req.method, pathname, query, post, {});
            })
        } else {
            let form = new Form({
                uploadDir: HTTP_UPLOAD
            });
            form.parse(req);
            let post = {};
            let files = {};
            form.on('field', (name, value) => {
                post[name] = value;
            });
            form.on('file', (name, value) => {
                files[name] = value;
            });
            form.on('error', err => {
                console.log(err);
            });
            form.on('close', () => {
                handle(req.method, pathname, query, post, files);
            })
        }
    } else {
        handle(req.method, pathname, query, {}, {});
    }
}).listen(HTTP_PORT);