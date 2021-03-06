const mysql = require("mysql");
const co = require("co-mysql");
const http = require("http");
const url = require("url");
const fs = require("fs");
const validator = require("./libs/validator");
let conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: '20190708',
    connectionLimit: 10
});
let db = co(conn);
http.createServer(async (req, res) => {
    let {
        pathname,
        query
    } = url.parse(req.url, true);
    if (pathname == "/reg") {
        let {
            username,
            password
        } = query;
        let err = validator.username(username);
        if(!!err){
            res.write(err);
        }else{
            let err1 = validator.password(password);
            if (!!err1) {
                res.write(err1);
            }else{
                try {
                    let data = await db.query(`SELECT ID FROM user_table WHERE username='${username}'`);
                    if (data.length > 0) {
                        res.write("该用户已存在");
                    } else {
                        await db.query(`INSERT INTO user_table (username,password) VALUES ('${username}','${password}')`);
                        res.write("注册成功");
                    }
                } catch (err2) {
                    res.write("数据库错误");
                }
            }
        }
        res.end();
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