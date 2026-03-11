import { useState } from "react"
import API from "../services/api"

function PublicResult() {

const [roll, setRoll] = useState("")
const [result, setResult] = useState(null)
const [error, setError] = useState("")

const handleSearch = async () => {


try {

  const res = await API.get(`/results/roll/${roll}`)
  setResult(res.data)
  setError("")

} catch (err) {

  setResult(null)
  setError("Result not found")

}


}

return ( <div className="p-10 max-w-xl mx-auto">


  <h1 className="text-3xl font-bold mb-6 text-center">
    Check Student Result
  </h1>

  <div className="flex gap-2 mb-6">

    <input
      type="text"
      placeholder="Enter Roll Number"
      value={roll}
      onChange={(e) => setRoll(e.target.value)}
      className="border p-2 flex-1 rounded"
    />

    <button
      onClick={handleSearch}
      className="bg-blue-600 text-white px-4 rounded"
    >
      Search
    </button>

  </div>

  {error && (
    <p className="text-red-500">{error}</p>
  )}

  {result && (

    <div className="border p-4 rounded">

      <h2 className="text-xl font-bold mb-2">
        {result.studentId.name}
      </h2>

      <p>Roll: {result.studentId.roll}</p>
      <p>Semester: {result.semester}</p>

      <div className="mt-4">

        {result.subjects.map((sub, i) => (
          <div key={i}>
            {sub.name} : {sub.marks}
          </div>
        ))}

      </div>

    </div>

  )}

</div>


)
}

export default PublicResult
