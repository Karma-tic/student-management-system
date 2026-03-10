const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const resultRoutes = require("./routes/resultRoutes")
require("dotenv").config()

const studentRoutes = require("./routes/studentRoutes")

const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type"]
}))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

app.use("/api/students", studentRoutes)

app.get("/", (req, res) => {
  res.send("Student Management API Running")
})

const PORT = process.env.PORT || 5001;
app.use("/api/results", resultRoutes)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});