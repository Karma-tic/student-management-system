require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const Admin = require("./models/Admin")

mongoose.connect(process.env.MONGO_URI)

async function createAdmin() {

const password = await bcrypt.hash("admin123", 10)

const admin = new Admin({
email: "admin@test.com",
password
})

await admin.save()

console.log("Admin created")

process.exit()
}

createAdmin()
