const express = require('express');

let server = express();
server.listen(8080);


server.get('/a', (req, res, next) => {
    req.user_count = 5;
    next();
})
server.get('/a', (req, res, next) => {
    console.log(req.user_count);
})

server.use(express.static('./static/'))