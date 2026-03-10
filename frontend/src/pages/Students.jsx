import { useState, useEffect } from "react"
import API from "../services/api"
function Students() {

const [students, setStudents] = useState([])
const fetchStudents = async () => {
  const res = await API.get("/students")
  setStudents(res.data)
}
useEffect(() => {
  fetchStudents()
}, [])
  const [search, setSearch] = useState("")

const handleDelete = async (id) => {
  await API.delete(`/students/${id}`)
  fetchStudents()
}

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.roll.includes(search)
  )

  return (
    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold mb-4">
        Students List
      </h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by name or roll"
        className="border p-2 mb-4 w-full rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <table className="w-full border">

        <thead className="bg-gray-100">
<tr>
<th className="border p-2">Photo</th>
<th className="border p-2">Name</th>
<th className="border p-2">Roll</th>
<th className="border p-2">Class</th>
<th className="border p-2">Contact</th>
<th className="border p-2">Actions</th>
</tr>
</thead>

        <tbody>

          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td className="border p-2">
  {student.photo && (
    <img
      src={student.photo}
      alt="student"
      className="w-12 h-12 object-cover rounded"
    />
  )}
</td>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.roll}</td>
              <td className="border p-2">{student.class}</td>
              <td className="border p-2">{student.contact}</td>

              <td className="border p-2">

                <button
                  onClick={() => handleDelete(student._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default Students