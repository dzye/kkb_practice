const http = require("http");
const queryString = require("querystring");
http.createServer((req, res) => {
    let [url, params] = req.url.split("?");
    let {
        username,
        password
    } = queryString.parse(params);
    console.log(url, username, password);
    res.end();
}).listen(8010);