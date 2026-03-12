const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

const studentRoutes = require("./routes/studentRoutes")
const resultRoutes = require("./routes/resultRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

// Middleware FIRST
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://student-management-system-nu-rose.vercel.app"
  ],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}))

app.use(express.json())

// Routes AFTER middleware
app.use("/api/auth", authRoutes)
app.use("/api/students", studentRoutes)
app.use("/api/results", resultRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

app.get("/", (req, res) => {
  res.send("Student Management API Running")
})

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})