const express = require("express")
const router = express.Router()
const Student = require("../models/Student")
const upload = require("../config/multer")
// Add Student
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const student = new Student({
  name: req.body.name,
  roll: req.body.roll,
  class: req.body.class,
  contact: req.body.contact,
  photo: req.file ? req.file.path : ""
})
    const savedStudent = await student.save()
    res.json(savedStudent)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get All Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find()
    res.json(students)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete Student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id)
    res.json({ message: "Student deleted" })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router