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

module.exports = router