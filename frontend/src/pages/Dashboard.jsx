import { useEffect, useState } from "react"
import API from "../services/api"
import { Link } from "react-router-dom"

function Dashboard() {

const [students, setStudents] = useState([])
const [results, setResults] = useState([])

useEffect(() => {
fetchData()
}, [])

const fetchData = async () => {
try {


  const studentRes = await API.get("/students")
  const resultRes = await API.get("/results")

  setStudents(studentRes.data)
  setResults(resultRes.data)

} catch (error) {
  console.log(error)
}


}

const recentStudents = students.slice(-5).reverse()

return (


<div className="p-6">

  <h1 className="text-2xl font-bold mb-6">
    Dashboard
  </h1>

  {/* Stats Cards */}

  <div className="grid grid-cols-3 gap-6 mb-8">

    <div className="bg-blue-500 text-white p-6 rounded shadow">
      <h2 className="text-lg">Total Students</h2>
      <p className="text-3xl font-bold">
        {students.length}
      </p>
    </div>

    <div className="bg-green-500 text-white p-6 rounded shadow">
      <h2 className="text-lg">Total Results</h2>
      <p className="text-3xl font-bold">
        {results.length}
      </p>
    </div>

    <div className="bg-purple-500 text-white p-6 rounded shadow">
      <h2 className="text-lg">System Status</h2>
      <p className="text-xl font-bold">
        Online
      </p>
    </div>

  </div>

  {/* Quick Actions */}

  <div className="flex gap-4 mb-8">

    <Link
      to="/add-student"
      className="bg-blue-600 text-white px-6 py-3 rounded shadow"
    >
      Add Student
    </Link>

    <Link
      to="/add-result"
      className="bg-green-600 text-white px-6 py-3 rounded shadow"
    >
      Add Result
    </Link>

  </div>

  {/* Recent Students */}

  <div className="bg-white rounded shadow p-6">

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

        {recentStudents.map((student) => (

          <tr key={student._id}>

            <td className="border p-2">
              {student.name}
            </td>

            <td className="border p-2">
              {student.roll}
            </td>

            <td className="border p-2">
              {student.class}
            </td>

            <td className="border p-2">
              {student.contact}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>


)

}

export default Dashboard
