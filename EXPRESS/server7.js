const express = require('express');
const cookieParser = require('cookie-parser');
let server = express();
server.listen(8080);

server.use(cookieParser('sdfasfdasfdasgafdsfasdfasf'));
server.get('/a', (req, res, next) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.cookie('bbb', 'ccc', {
        httpOnly: true,
        maxAge: 290 * 1000 * 3333,
        // secure:true,
        signed: true
    })
    res.send('ok');
})