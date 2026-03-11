import { useState, useEffect, useRef } from "react"
import API from "../services/api"
import { useReactToPrint } from "react-to-print"
import ResultSheet from "../components/ResultSheet"

function Results() {

const [results, setResults] = useState([])
const [selectedResult, setSelectedResult] = useState(null)

const printRef = useRef(null)

useEffect(() => {
fetchResults()
}, [])

const fetchResults = async () => {
try {
const res = await API.get("/results")
setResults(res.data)
} catch (err) {
console.error("Error fetching results:", err)
}
}

const calculateTotal = (subjects) => {
return subjects.reduce((total, sub) => total + Number(sub.marks), 0)
}

const handlePrint = useReactToPrint({
contentRef: printRef,
documentTitle: `${selectedResult?.studentId?.name}_Result`
})

return ( <div className="bg-white p-6 rounded shadow">


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
        <th className="border p-2">Print</th>
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

          <td className="border p-2">

            <button
              onClick={() => {
                setSelectedResult(result)
                setTimeout(() => handlePrint(), 100)
              }}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Print
            </button>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

  {/* Printable component */}
  <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
    <ResultSheet ref={printRef} result={selectedResult} />
  </div>

</div>

)
}

export default Results
