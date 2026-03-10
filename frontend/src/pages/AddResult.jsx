import { useState, useEffect } from "react"
import API from "../services/api"

function AddResult() {

  const [students, setStudents] = useState([])

  const [formData, setFormData] = useState({
    studentId: "",
    semester: "",
    subjects: [
      { name: "Math", marks: "" },
      { name: "Science", marks: "" },
      { name: "English", marks: "" }
    ]
  })

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    const res = await API.get("/students")
    setStudents(res.data)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleMarksChange = (index, value) => {

    const updatedSubjects = [...formData.subjects]
    updatedSubjects[index].marks = value

    setFormData({
      ...formData,
      subjects: updatedSubjects
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      await API.post("/results", formData)

      alert("Result added successfully")

      setFormData({
        studentId: "",
        semester: "",
        subjects: [
          { name: "Math", marks: "" },
          { name: "Science", marks: "" },
          { name: "English", marks: "" }
        ]
      })

    } catch (error) {
      console.error(error)
      alert("Error saving result")
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl">

      <h2 className="text-2xl font-bold mb-6">
        Add Student Result
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Student Dropdown */}
        <div>
          <label className="block mb-1">Student</label>
          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >

            <option value="">Select Student</option>

            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name} ({student.roll})
              </option>
            ))}

          </select>
        </div>

        {/* Semester */}
        <div>
          <label className="block mb-1">Semester / Session</label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Subjects */}
        <div className="space-y-2">

          {formData.subjects.map((subject, index) => (
            <div key={index} className="flex gap-2">

              <input
                type="text"
                value={subject.name}
                readOnly
                className="border p-2 rounded w-1/2"
              />

              <input
                type="number"
                placeholder="Marks"
                value={subject.marks}
                onChange={(e) =>
                  handleMarksChange(index, e.target.value)
                }
                className="border p-2 rounded w-1/2"
                required
              />

            </div>
          ))}

        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save Result
        </button>

      </form>

    </div>
  )
}

export default AddResult