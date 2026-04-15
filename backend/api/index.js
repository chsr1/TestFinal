const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db("SchoolDB");
    console.log("Connected to MongoDB Atlas");
  }
  return db;
}

// Get all students
app.get("/api/students", async (req, res) => {
  const database = await connectDB();
  const students = await database.collection("students").find().toArray();
  res.json(students);
});

// Add student
app.post("/api/students", async (req, res) => {
  const database = await connectDB();
  await database.collection("students").insertOne(req.body);
  res.json({ message: "Student added successfully" });
});

// Update student
app.put("/api/students/:id", async (req, res) => {
  const database = await connectDB();

  await database.collection("students").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );

  res.json({ message: "Student updated successfully" });
});

// Delete student
app.delete("/api/students/:id", async (req, res) => {
  const database = await connectDB();

  await database.collection("students").deleteOne({
    _id: new ObjectId(req.params.id),
  });

  res.json({ message: "Student deleted successfully" });
});

module.exports = app;