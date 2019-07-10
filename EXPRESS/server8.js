const express = require('express');
const cookieSession = require('cookie-session');

let server = express();
server.listen(8080);

server.use(cookieSession({
    keys: ['adsfasdfdsafgfdgdfg', 'adsfdsafsdfas', 'asdfasdfasdfasdf'],
    maxAge: 20 * 60 * 1000
}));
server.get('/a', (req, res, next) => {
    if (!req.session['view']) {
        req.session['view'] = 1;
    } else {
        req.session['view']++;
    }
    res.send(`${req.session['view']}`);
})