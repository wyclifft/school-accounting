// src/App.jsx
import { useState } from "react"
import StudentList from "./StudentList"
import PaymentForm from "./PaymentForm"
import ExpenseForm from "./ExpenseForm"
import Dashboard from "./Dashboard"

function App() {
  const [page, setPage] = useState("dashboard")

  const navItems = [
    { name: "Dashboard", key: "dashboard" },
    { name: "Students", key: "students" },
    { name: "Payments", key: "payments" },
    { name: "Expenses", key: "expenses" },
  ]

  return (
    <div className="min-h-screen flex bg-gray-50 font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-2xl font-bold text-blue-600 border-b">School Accounting</div>
        <nav className="mt-6 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className={`text-left px-6 py-3 rounded-lg transition-all hover:bg-blue-100 ${
                page === item.key ? "bg-blue-200 font-semibold" : "font-medium"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {page === "dashboard" && <Dashboard />}
        {page === "students" && <StudentList />}
        {page === "payments" && <PaymentForm />}
        {page === "expenses" && <ExpenseForm />}
      </main>
    </div>
  )
}

export default App
