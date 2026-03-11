import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Login() {

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState("")

const navigate = useNavigate()

const handleLogin = async (e) => {
e.preventDefault()


try {

  const res = await API.post("/auth/login", {
    email,
    password
  })

  localStorage.setItem("token", res.data.token)

  navigate("/")

} catch (err) {

  setError("Invalid credentials")

}


}

return (

<div className="h-screen flex items-center justify-center bg-gray-100">

  <form
    onSubmit={handleLogin}
    className="bg-white p-8 rounded shadow w-80"
  >

    <h2 className="text-2xl font-bold mb-4 text-center">
      Admin Login
    </h2>

    {error && (
      <p className="text-red-500 text-sm mb-3">
        {error}
      </p>
    )}

    <input
      type="email"
      placeholder="Email"
      className="border p-2 w-full mb-3 rounded"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      className="border p-2 w-full mb-4 rounded"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      className="bg-blue-600 text-white w-full py-2 rounded"
    >
      Login
    </button>

  </form>

</div>


)
}

export default Login
