const express = require('express');
const querystring = require('querystring');
let server = express();
server.listen(8080);

server.use((req, res, next) => {
    let arr = [];
    req.on('data', buffer => {
        arr.push(buffer);
    });
    req.on('end', () => {
        req.body = querystring.parse(Buffer.concat(arr).toString());
        next();
    });
});
server.post('/a', (req, res, next) => {
    console.log(req.body);
})