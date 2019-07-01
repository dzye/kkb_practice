const url = require("url");

let str = "http://www.baiud.com/main/question?a=3&b=3&c=d";

// console.log(url.parse(str));
console.log(url.parse(str, true));