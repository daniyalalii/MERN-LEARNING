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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
