import React from "react"

const ResultSheet = React.forwardRef(({ result }, ref) => {

if (!result) return null

const total = result.subjects.reduce(
(sum, s) => sum + Number(s.marks),
0
)

return ( <div ref={ref} className="p-8 bg-white">


  <h1 className="text-3xl font-bold text-center mb-6">
    Student Result Sheet
  </h1>

  <p><strong>Name:</strong> {result.studentId?.name}</p>
  <p><strong>Roll:</strong> {result.studentId?.roll}</p>
  <p><strong>Semester:</strong> {result.semester}</p>

  <table className="w-full border mt-4">

    <thead>
      <tr>
        <th className="border p-2">Subject</th>
        <th className="border p-2">Marks</th>
      </tr>
    </thead>

    <tbody>
      {result.subjects.map((sub, i) => (
        <tr key={i}>
          <td className="border p-2">{sub.name}</td>
          <td className="border p-2">{sub.marks}</td>
        </tr>
      ))}
    </tbody>

  </table>

  <h2 className="mt-4 font-bold">
    Total: {total}
  </h2>

</div>


)
})

export default ResultSheet
