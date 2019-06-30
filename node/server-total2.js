const http = require("http");
const url = require("url");
const queryString = require("querystring");
const fs = require("fs");
http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:8099');
    const method = req.method;
    let [path, get, post] = ['', {}, {}];
    let user = {
        dzye: '116811'
    };
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
        let {
            username,
            password
        } = get;
        if (path === "/reg") {
            console.log(user[username]);
            if (user[username]) {
                res.write(JSON.stringify({
                    error: 1,
                    msg: "该用户已注册"
                }));
                res.end();
            } else {
                user[username] = password;
                res.write(JSON.stringify({
                    error: 0,
                    msg: '注册成功'
                }));
                res.end();
            }
        } else if (path === "/login") {
            if (!user[username]) {
                res.write(JSON.stringify({
                    error: 1,
                    msg: '不存在该用户名'
                }));
                res.end();
            } else if (user[username] != password) {
                res.write(JSON.stringify({
                    error: 1,
                    msg: '密码错误'
                }));
                res.end();
            } else {
                res.write(JSON.stringify({
                    error: 0,
                    msg: '登陆成功'
                }));
                res.end();
            }
        } else {
            fs.readFile(`www${path}`, (err, data) => {
                if (err) {
                    res.writeHead("404");
                    res.write('NOT FOUND');
                    res.end();
                } else {
                    res.write(data);
                    res.end();
                }
            })
        }
    }
}).listen("8010");