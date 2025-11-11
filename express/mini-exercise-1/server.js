const express = require("express");
const app = express();
const PORT = 3000;

// "/" page
app.get("/", (req, res) => {
  res.send("Hello from Express! 🚀");
});

// about page
app.get("/about",(req,res)=>{
    res.send("This is about page!");
});
 

// contact page
app.get("/contact",(req,res)=>{
    res.send("This is contact page!");
});

// services page
app.get("/services",(req,res)=>{
  res.send("Our Services Page!");
});

// middleware 
app.use((req,res,next)=>{
  console.log("Request Recieved");
  next();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

