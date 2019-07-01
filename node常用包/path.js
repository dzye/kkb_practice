const path = require("path");
let str = "c://www/baidu/com/6.txt";
console.log(path.dirname(str));
console.log(path.extname(str));
console.log(path.basename(str));
console.log(path.resolve(__dirname, 'build'));
console.log(path.resolve('c:/a/c', '../b/txt.txt'));