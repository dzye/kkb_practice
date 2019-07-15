const fs = require('fs');
let len = 1024;
let count = 2048;
let arr = [];
let txt = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOP[]ASDFGHJKL;ZXCVBNM,/!@#$%^&&*()1234567890-=_+';
for (let i = 0; i < count; i++) {
    let txt_one = '';
    for (let j = 0; j < len; j++) {
        txt_one = txt_one + txt[Math.floor(Math.random() * txt.length)];
    }
    arr.push(txt_one);
}
fs.writeFileSync('.keys', arr.join('\n'));