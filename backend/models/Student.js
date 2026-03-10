const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  roll: {
    type: String,
    required: true,
    unique: true
  },

  class: {
    type: String,
    required: true
  },

  contact: {
    type: String
  },

  photo: {
    type: String
  }

}, { timestamps: true })

module.exports = mongoose.model("Student", studentSchema)