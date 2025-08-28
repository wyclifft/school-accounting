// src/StudentList.jsx
import { useState } from "react"

function StudentList() {
  const [students] = useState([
    { id: 1, name: "John Doe", grade: "Grade 10", status: "Active" },
    { id: 2, name: "Jane Smith", grade: "Grade 9", status: "Active" },
    { id: 3, name: "Mike Johnson", grade: "Grade 12", status: "Inactive" },
  ])

  const [search, setSearch] = useState("")

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700">Students</h2>
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Grade</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                className="border-b hover:bg-blue-50 transition-colors"
              >
                <td className="px-6 py-3">{s.name}</td>
                <td className="px-6 py-3">{s.grade}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      s.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentList
