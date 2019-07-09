const fs = require("fs");
const zlib = require("zlib");

let rs = fs.createReadStream('./www/1.txt');
let gzip = zlib.createGzip();
let ws = fs.createWriteStream('./www/2.txt.gz');

rs.pipe(gzip).pipe(ws);
rs.on('error', err => {
    console.log(err);
})
ws.on('finish', () => {
    console.log("finish");
})