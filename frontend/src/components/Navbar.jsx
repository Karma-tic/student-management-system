function Navbar() {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-8">

      <h1 className="text-xl font-semibold">
        Student Management System
      </h1>

      <div className="flex items-center gap-4">

        <span className="text-gray-600">
          Admin
        </span>

        <button className="bg-red-500 text-white px-4 py-1 rounded">
          Logout
        </button>

      </div>

    </div>
  )
}

export default Navbar