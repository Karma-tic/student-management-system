import { useState } from "react"
import API from "../services/api"
function AddStudent() {

const [formData, setFormData] = useState({
  name: "",
  roll: "",
  class: "",
  contact: "",
  photo: null
})

const handleChange = (e) => {
  if (e.target.name === "photo") {
    setFormData({
      ...formData,
      photo: e.target.files[0]
    })
  } else {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const data = new FormData()
  data.append("name", formData.name)
  data.append("roll", formData.roll)
  data.append("class", formData.class)
  data.append("contact", formData.contact)
  data.append("photo", formData.photo)

  try {

    await API.post("/students", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    alert("Student added successfully")

    setFormData({
      name: "",
      roll: "",
      class: "",
      contact: "",
      photo: null
    })

  } catch (error) {
    console.error(error)
    alert("Error adding student")
  }
}

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold mb-6">
        Add Student
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Student Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Roll Number</label>
          <input
            type="text"
            name="roll"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Class</label>
          <input
            type="text"
            name="class"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Contact</label>
          <input
            type="text"
            name="contact"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Student Photo</label>
<input
  type="file"
  name="photo"
  onChange={handleChange}
  className="w-full"
/>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Student
        </button>

      </form>

    </div>
  )
}

export default AddStudent