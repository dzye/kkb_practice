const fs = require("fs");
// fs.writeFile("./a.txt", "123123", err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("success");
//     }
// })
fs.readFile("./a.txt",(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
})