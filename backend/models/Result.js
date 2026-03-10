const mongoose = require("mongoose")

const resultSchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  subjects: [
    {
      name: String,
      marks: Number
    }
  ],

  semester: {
    type: String
  }

}, { timestamps: true })

module.exports = mongoose.model("Result", resultSchema)