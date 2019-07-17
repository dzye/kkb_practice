const mysql = require("mysql");

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: 'cpts'
});
db.query(`SELECT * FROM banner_table`, (err, data) => {
    if (err) {
        console.log("错了", err)
    } else {
        console.log(data);
    }
})