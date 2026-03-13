import { useNavigate } from "react-router-dom"

function Navbar() {

const navigate = useNavigate()

const handleLogout = () => {


localStorage.removeItem("token")

navigate("/login")


}

return (


<div className="flex justify-end items-center p-4 bg-white shadow">

  <span className="mr-4 font-medium">
    Admin
  </span>

  <button
    onClick={handleLogout}
    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  >
    Logout
  </button>

</div>


)

}

export default Navbar
