const http = require("http");
const url = require("url");
const queryString = require("querystring");
http.createServer((req, res) => {
    const method = req.method;
    let [path, get, post] = ['', {}, {}];
    if (method === 'GET') {
        let {
            pathname,
            query
        } = url.parse(req.url);
        let params = queryString.parse(query);
        path = pathname;
        get = params;
        complete();
    } else if (method === 'POST') {
        path = req.url;
        let arr = [];
        req.on('data', buffer => {
            arr.push(buffer);
        })
        req.on('end', () => {
            let params = queryString.parse(Buffer.concat(arr).toString());
            post = params;
            complete();
        })
    }

    function complete() {
        console.log(path, get, post);
        res.end();
    }
}).listen("8010");