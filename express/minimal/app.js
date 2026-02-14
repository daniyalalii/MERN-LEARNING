const express = require('express');
const app = express();

function logger(req,res,next) {
    const start = Date.now();
    res.on('finish',()=>{
        const timestamp = new Date().toISOString();
        const duration = Date.now() - start;
        console.log(`[${timestamp}] ${req.method} ${req.url} | Status: ${res.statusCode} | Response Time: ${duration}ms`);
    });
    next();
}

app.use(logger);

app.get('/', (req,res)=>{
    res.send("/ page");
});

app.get('/health', (req,res)=>{
    res.status(200).json({message: "OK!"});
});

// error handling middleWare
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({error: err.message});
});

module.exports = app;