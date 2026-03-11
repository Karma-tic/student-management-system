import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Students from "./pages/Students"
import AddStudent from "./pages/AddStudent"
import Results from "./pages/Results"
import AddResult from "./pages/AddResult"

import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

return (


<BrowserRouter>

  <Routes>

    <Route path="/login" element={<Login />} />

    <Route
      path="/*"
      element={
        <ProtectedRoute>

          <div className="flex">
  <Sidebar />
  <div className="flex-1 ml-64">

              <Navbar />

              <Routes>

                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/results" element={<Results />} />
                <Route path="/add-result" element={<AddResult />} />

              </Routes>

            </div>

          </div>

        </ProtectedRoute>
      }
    />

  </Routes>

</BrowserRouter>


)

}

export default App
