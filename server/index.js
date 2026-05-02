console.log("🔥 NEW SERVER FILE RUNNING 🔥");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/test", (req, res) => {
  console.log("TEST HIT 🔥");
  res.send("Working");
});

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes")); // 👈 ADD THIS LINE

// server
app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));