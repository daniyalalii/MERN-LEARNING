const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send("/ page");
});

app.get('/health', (req,res)=>{
    res.status(200).json({message: "OK!"});
});

module.exports = app;

