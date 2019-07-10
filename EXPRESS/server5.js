const express = require('express');
const body = require('./libs/body-parser');
let server = express();
server.listen(8080);

server.use(body.urlencoded());
server.post('/a', (req, res, next) => {
    console.log(req.body);
})