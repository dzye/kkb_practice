const mysql = require("mysql");

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: '20190708'
});
db.query(`SELECT * FROM user_table`, (err, data) => {
    if (err) {
        console.log("错了", err)
    } else {
        console.log(data);
    }
})