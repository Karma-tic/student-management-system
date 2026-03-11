const express = require("express")
const router = express.Router()
const Result = require("../models/Result")

// Add Result
router.post("/", async (req, res) => {
  try {

    const result = new Result(req.body)
    const saved = await result.save()

    res.json(saved)

  } catch (err) {
    res.status(500).json(err)
  }
})

// Get All Results
router.get("/", async (req, res) => {
  try {

    const results = await Result.find().populate("studentId")
    res.json(results)

  } catch (err) {
    res.status(500).json(err)
  }
})
// Get result by roll number
router.get("/roll/:roll", async (req, res) => {
  try {

    const student = await require("../models/Student").findOne({
      roll: req.params.roll
    })

    if (!student) {
      return res.status(404).json({ message: "Student not found" })
    }

    const result = await Result.findOne({
      studentId: student._id
    }).populate("studentId")

    if (!result) {
      return res.status(404).json({ message: "Result not found" })
    }

    res.json(result)

  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router