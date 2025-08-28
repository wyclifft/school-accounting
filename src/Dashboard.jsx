// src/Dashboard.jsx
import { FaUserGraduate, FaMoneyBillWave, FaFileInvoiceDollar, FaCoins } from "react-icons/fa"

function Dashboard() {
  // Example stats
  const stats = [
    { title: "Total Students", value: 120, icon: <FaUserGraduate className="text-blue-500 w-8 h-8" /> },
    { title: "Total Payments", value: "$45,000", icon: <FaMoneyBillWave className="text-green-500 w-8 h-8" /> },
    { title: "Total Expenses", value: "$12,000", icon: <FaCoins className="text-red-500 w-8 h-8" /> },
    { title: "Pending Fees", value: "$3,500", icon: <FaFileInvoiceDollar className="text-yellow-500 w-8 h-8" /> },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome / Header */}
      <div className="text-2xl font-semibold text-gray-700">Welcome back, Admin!</div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-xl transition-shadow"
          >
            <div className="p-4 bg-gray-100 rounded-full">{stat.icon}</div>
            <div>
              <div className="text-gray-500 text-sm">{stat.title}</div>
              <div className="text-xl font-bold text-gray-800">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Example Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6">
          <div className="text-gray-700 font-semibold mb-4">Payments Over Time</div>
          <div className="h-48 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <div className="text-gray-700 font-semibold mb-4">Student Attendance</div>
          <div className="h-48 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
