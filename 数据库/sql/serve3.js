const mysql = require("mysql");
const http = require("http");
const url = require("url");
const fs = require("fs");
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: '20190708'
});
http.createServer((req, res) => {
    let {
        pathname,
        query
    } = url.parse(req.url, true);
    if (pathname == "/reg") {
        let {
            username,
            password
        } = query;
        if (!username || !password) {
            res.write("用户名和密码不能为空");
            res.end();
        } else if (username.length > 32) {
            res.write("用户名长度不能超过32");
            res.end();
        } else if (password.length > 32) {
            res.write("密码长度不能超过32");
            res.end();
        } else {
            db.query(`SELECT ID FROM user_table WHERE username='${username}'`, (err, data) => {
                if (err) {
                    res.write("数据库错误", err);
                    res.end();
                } else if (data.length > 0) {
                    res.write("该用户已存在");
                    res.end();
                } else {
                    db.query(`INSERT INTO user_table (username,password) VALUES ('${username}','${password}')`, (err, data) => {
                        if (err) {
                            res.write("数据库错误", err);
                            res.end();
                        } else {
                            res.write("注册成功");
                            res.end();
                        }
                    })
                }
            })
        }
    } else if (pathname == "/login") {

    } else {
        fs.readFile('www' + pathname, (err, buffer) => {
            if (err) {
                res.writeHead(404);
                res.write("not found");
            } else {
                res.write(buffer);
            }
            res.end();
        })
    }

}).listen(8080);

// db.query(`SELECT * FROM user_table`, (err, data) => {
//     if (err) {
//         console.log("错了", err)
//     } else {
//         console.log(data);
//     }
// })