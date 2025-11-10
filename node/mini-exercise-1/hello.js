const fs = require("fs");
fs.readFile("data.txt","utf8",(err,res)=>{
    if(err) throw err;
    console.log(res);
});