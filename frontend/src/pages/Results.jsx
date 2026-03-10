import { useState, useEffect } from "react"
import API from "../services/api"

function Results() {

  const [results, setResults] = useState([])

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    const res = await API.get("/results")
    setResults(res.data)
  }

  const calculateTotal = (subjects) => {
    return subjects.reduce((total, sub) => total + Number(sub.marks), 0)
  }

  return (
    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold mb-4">
        Results Management
      </h2>

      <table className="w-full border">

        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Student</th>
            <th className="border p-2">Roll</th>
            <th className="border p-2">Semester</th>
            <th className="border p-2">Subjects</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>

        <tbody>

          {results.map((result) => (

            <tr key={result._id}>

              <td className="border p-2">
                {result.studentId?.name}
              </td>

              <td className="border p-2">
                {result.studentId?.roll}
              </td>

              <td className="border p-2">
                {result.semester}
              </td>

              <td className="border p-2">

                {result.subjects.map((sub, i) => (
                  <div key={i}>
                    {sub.name}: {sub.marks}
                  </div>
                ))}

              </td>

              <td className="border p-2 font-semibold">

                {calculateTotal(result.subjects)}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default Results