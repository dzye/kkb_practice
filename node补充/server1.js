const fs = require("fs");
let rs = fs.createReadStream('./www/1.txt');
let ws = fs.createWriteStream('./www/2.txt');

rs.pipe(ws);
rs.on('error', err => {
    console.log(err);
})
ws.on('finish', () => {
    console.log("finish");
})