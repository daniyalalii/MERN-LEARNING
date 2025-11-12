const express = require("express");
const app = express();
const PORT = 3000;

// Parse JSON
app.use(express.json());

// Fake data
let users = [
  { id: 1, name: "Daniyal", age: 20 },
  { id: 2, name: "Ali", age: 22 }
];

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// getting users greater than specific age
app.get("/users/age/:age",(req,res)=>{
    const ageParam = Number(req.params.age);
    const filteredUsers = users.filter(u=> u.age>ageParam);
    res.json(filteredUsers);
});
// GET single user
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

// CREATE user
app.post("/users", (req, res) => {
  const { name, age } = req.body;
  const newUser = { id: users.length + 1, name, age };
  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE user
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, age } = req.body;
  const user = users.find(u => u.id === id);

  if (!user) return res.status(404).send("User not found");

  user.name = name ?? user.name;
  user.age = age ?? user.age;

  res.json(user);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(u => u.id !== id);
  res.send("User deleted successfully");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
