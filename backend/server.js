const express = require("express");
const notes = require("./data/notes");
const app = express();
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./database/dbConnection");
const userRoutes = require("./Routes/userRoutes");
const noteRoutes = require("./Routes/noteRoutes");

app.use(cors());

app.use(express.json());
dbConnection();
app.get("/", (req, res) => {
  res.status(200).json({ Status: "SUCCESS", message: "Api running" });
});

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((n) => n._id === id);
  if (!note) {
    return res.status(404).json({ status: "FAIL", message: "Note not found" });
  }
  res.status(200).json({ Status: "SUCCESS", message: "Good", note });
});
app.listen(5000, () => {
  console.log("THE SERVER IS RUNNING IN 5000");
});
