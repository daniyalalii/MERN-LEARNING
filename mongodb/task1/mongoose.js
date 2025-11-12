import express from "express";
import mongoose from "mongoose";
const PORT = 3000;
const app = express();
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/usersDB")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ DB Connection Error:", err));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
    minlength: [2, "Name too short!"]
  },
  age: {
    type: Number,
    required: [true, "Age is required!"],
    min: [1, "Age must be positive!"]
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});
 
const User = mongoose.model("User", userSchema);

// CREATE (POST)
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "✅ User added", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL (GET)
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// READ by AGE
app.get("/users/age/:age", async (req, res) => {
  const age = parseInt(req.params.age);
  const users = await User.find({ age: { $gt: age } });
  res.json(users);
});

// UPDATE (PUT)
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ message: "✅ User updated", updated });
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: "✅ User deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});