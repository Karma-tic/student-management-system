import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed">

      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        SMS Admin
      </div>

      <ul className="p-4 space-y-4">

        <li>
          <Link to="/" className="block hover:bg-gray-700 p-2 rounded">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/students" className="block hover:bg-gray-700 p-2 rounded">
            Students
          </Link>
        </li>

        <li>
          <Link to="/results" className="block hover:bg-gray-700 p-2 rounded">
            Results
          </Link>
        </li>

        <li>
          <Link to="/add-student" className="block hover:bg-gray-700 p-2 rounded">
            Add Student
          </Link>
        </li>

        <li>
          <Link to="/add-result" className="block hover:bg-gray-700 p-2 rounded">
            Add Result
          </Link>
        </li>

      </ul>

    </div>
  )
}

export default Sidebar