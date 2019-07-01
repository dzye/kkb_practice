const http = require("http");
const bufferParse = require("bufferParse");
const fs = require("fs");
http.createServer((req, res) => {
    let arr = [];
    let separator = '--' + req.headers['content-type'].split(";")[1].split("=")[1];
    req.on('data', buffer => {
        arr.push(buffer);
    })
    req.on('end', () => {
        let str = Buffer.concat(arr);
        let res = bufferParse.bufferParse(str, separator);
        res.shift();
        res.forEach(val => {
            let buffer = val.slice(2, val.length - 2);
            let n = buffer.indexOf("\r\n\r\n");
            let info = buffer.slice(0, n).toString();
            let data = buffer.slice(n + 4);
            if (info.indexOf("\r\n") != -1) {
                let res2 = info.split("\r\n")[0].split("; ");
                let name = res2[1].split("=")[1];
                let filename = res2[2].split("=")[1];
                name = name.substring(1, name.length - 1);
                filename = filename.substring(1, filename.length - 1);
                fs.writeFile(`upload/${filename}`, data, err => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("上传成功");
                    }
                })
            } else {
                let name = info.split("; ")[1].split("=")[1];
                name = name.substring(1, name.length - 1);
            }
        })
    })
}).listen(8081);