import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"

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

} catch (err) {
  console.log(err)
}


}

const recentStudents = students.slice(-5).reverse()

return (


<div className="p-6">

  <h1 className="text-3xl font-bold mb-6">
    Dashboard
  </h1>

  {/* Stats Section */}

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

    <div className="bg-blue-600 text-white p-6 rounded-lg shadow">

      <p className="text-sm">Total Students</p>

      <h2 className="text-3xl font-bold">
        {students.length}
      </h2>

    </div>

    <div className="bg-green-600 text-white p-6 rounded-lg shadow">

      <p className="text-sm">Total Results</p>

      <h2 className="text-3xl font-bold">
        {results.length}
      </h2>

    </div>

    <div className="bg-purple-600 text-white p-6 rounded-lg shadow">

      <p className="text-sm">System Status</p>

      <h2 className="text-xl font-bold">
        Online
      </h2>

    </div>

  </div>


  {/* Quick Actions */}

  <div className="flex gap-4 mb-8">

    <Link
      to="/add-student"
      className="bg-blue-500 text-white px-5 py-3 rounded shadow hover:bg-blue-600"
    >
      Add Student
    </Link>

    <Link
      to="/add-result"
      className="bg-green-500 text-white px-5 py-3 rounded shadow hover:bg-green-600"
    >
      Add Result
    </Link>

  </div>


  {/* Recent Students */}

  <div className="bg-white rounded-lg shadow p-6">

    <h2 className="text-xl font-semibold mb-4">
      Recent Students
    </h2>

    <table className="w-full border">

      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Roll</th>
          <th className="p-2 border">Class</th>
          <th className="p-2 border">Contact</th>
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

</div>


)

}

export default Dashboard
