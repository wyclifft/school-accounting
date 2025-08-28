import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"

function StudentList() {
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState("")
  const [filterClass, setFilterClass] = useState("")

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    const { data, error } = await supabase.from("students").select("*")
    if (error) {
      console.error("Error fetching students:", error.message)
    } else {
      setStudents(data)
    }
  }

  const filteredStudents = students.filter(s => {
    return (
      (s.full_name.toLowerCase().includes(search.toLowerCase()) ||
        s.admission_no.toLowerCase().includes(search.toLowerCase())) &&
      (filterClass ? s.class === filterClass : true)
    )
  })

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student List</h2>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or admission no..."
          className="border p-2 rounded w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by class..."
          className="border p-2 rounded"
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
        />
      </div>

      {/* Student Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Admission No</th>
            <th className="border p-2">Full Name</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Total Fee</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((s) => (
            <tr key={s.id}>
              <td className="border p-2">{s.admission_no}</td>
              <td className="border p-2">{s.full_name}</td>
              <td className="border p-2">{s.class}</td>
              <td className="border p-2">{s.total_fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentList
