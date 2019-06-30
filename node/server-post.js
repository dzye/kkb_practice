const http = require("http");
const queryString = require("querystring");
http.createServer((req, res) => {
    let arr = [];
    req.on('data', buffer => {
        arr.push(buffer);
    });
    req.on('end', () => {
        let {
            username,
            password
        } = queryString.parse(Buffer.concat(arr).toString());
        console.log(username, password);
        res.end();
    })
}).listen("8010");