import { useEffect, useState } from "react"
import API from "../services/api"
import { Link } from "react-router-dom"
import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts"

function Dashboard() {

const [students, setStudents] = useState([])
const [results, setResults] = useState([])
const [search, setSearch] = useState("")

useEffect(() => {
fetchData()
}, [])

const fetchData = async () => {


try {

  const studentRes = await API.get("/students")
  const resultRes = await API.get("/results")

  setStudents(studentRes.data)
  setResults(resultRes.data)

} catch (err) {
  console.log(err)
}


}

// Student distribution by class

const classCounts = {}

students.forEach((s) => {
classCounts[s.class] = (classCounts[s.class] || 0) + 1
})

const chartData = Object.keys(classCounts).map((cls) => ({
class: cls,
students: classCounts[cls]
}))

// search students

const filteredStudents = students.filter((s) =>
s.name.toLowerCase().includes(search.toLowerCase()) ||
s.roll.includes(search)
)

const recentStudents = students.slice(-5).reverse()

return (


<div className="p-6">

  <h1 className="text-3xl font-bold mb-6">
    Dashboard
  </h1>

  {/* Stats */}

  <div className="grid grid-cols-3 gap-6 mb-8">

    <div className="bg-blue-600 text-white p-6 rounded">
      <p>Total Students</p>
      <h2 className="text-3xl font-bold">{students.length}</h2>
    </div>

    <div className="bg-green-600 text-white p-6 rounded">
      <p>Total Results</p>
      <h2 className="text-3xl font-bold">{results.length}</h2>
    </div>

    <div className="bg-purple-600 text-white p-6 rounded">
      <p>System Status</p>
      <h2 className="text-xl font-bold">Online</h2>
    </div>

  </div>


  {/* Quick Actions */}

  <div className="flex gap-4 mb-8">

    <Link
      to="/add-student"
      className="bg-blue-500 text-white px-5 py-2 rounded"
    >
      Add Student
    </Link>

    <Link
      to="/add-result"
      className="bg-green-500 text-white px-5 py-2 rounded"
    >
      Add Result
    </Link>

  </div>


  {/* Search */}

  <div className="mb-8">

    <input
      type="text"
      placeholder="Search student by name or roll..."
      className="border p-3 w-full rounded"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

  </div>


  {/* Student Distribution Chart */}

  <div className="bg-white p-6 rounded shadow mb-8">

    <h2 className="text-xl font-bold mb-4">
      Student Distribution by Class
    </h2>

    <ResponsiveContainer width="100%" height={300}>

      <BarChart data={chartData}>

        <XAxis dataKey="class" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="students" fill="#2563eb" />

      </BarChart>

    </ResponsiveContainer>

  </div>


  {/* Recent Students */}

  <div className="bg-white p-6 rounded shadow mb-8">

    <h2 className="text-xl font-bold mb-4">
      Recent Students
    </h2>

    <table className="w-full border">

      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Roll</th>
          <th className="border p-2">Class</th>
          <th className="border p-2">Contact</th>
        </tr>
      </thead>

      <tbody>

        {recentStudents.map((s) => (

          <tr key={s._id}>
            <td className="border p-2">{s.name}</td>
            <td className="border p-2">{s.roll}</td>
            <td className="border p-2">{s.class}</td>
            <td className="border p-2">{s.contact}</td>
          </tr>

        ))}

      </tbody>

    </table>

  </div>


  {/* Search Results */}

  {search && (

    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-xl font-bold mb-4">
        Search Results
      </h2>

      {filteredStudents.map((s) => (
        <div key={s._id}>
          {s.name} - Roll {s.roll}
        </div>
      ))}

    </div>

  )}

</div>


)

}

export default Dashboard
