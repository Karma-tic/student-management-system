import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"

import Dashboard from "./pages/Dashboard"
import Students from "./pages/Students"
import AddStudent from "./pages/AddStudent"
import Results from "./pages/Results"
import AddResult from "./pages/AddResult"

function App() {
  return (
    <Router>
      <div className="flex">

        <Sidebar />

        <div className="ml-64 w-full bg-gray-100 min-h-screen">

          <Navbar />

          <div className="p-6">

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/add-student" element={<AddStudent />} />
              <Route path="/results" element={<Results />} />
              <Route path="/add-result" element={<AddResult />} />
            </Routes>

          </div>

        </div>

      </div>
    </Router>
  )
}

export default App