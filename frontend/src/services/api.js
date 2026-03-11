import axios from "axios"

const API = axios.create({
  baseURL: "https://student-management-backend-g766.onrender.com/api"
})

export default API