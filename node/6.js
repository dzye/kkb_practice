//require 有路径直接找路径，没有路径先找程序node_modules,再找系统node_modules
const mod = require('mod1');
console.log(mod.a, mod.b);