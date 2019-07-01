const queryString = require("querystring");

let str = "a=3&b=4&c=5";
let json = {
    a: 3,
    b: 4,
    c: 5
};
console.log(queryString.parse(str));
console.log(queryString.stringify(json));