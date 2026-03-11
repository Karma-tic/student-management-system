const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin")

// Login Admin
router.post("/login", async (req, res) => {

  const email = req.body?.email
  const password = req.body?.password

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" })
  }

  try {

    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" })
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" })
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({ token })

  } catch (error) {
    res.status(500).json(error)
  }

})

module.exports = router
