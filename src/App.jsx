// src/App.jsx
import { useState } from "react"
import StudentList from "./StudentList"
import PaymentForm from "./PaymentForm"
import ExpenseForm from "./ExpenseForm"
import Dashboard from "./Dashboard"

function App() {
  const [page, setPage] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex gap-4">
        <button onClick={() => setPage("dashboard")} className="hover:underline">
          Dashboard
        </button>
        <button onClick={() => setPage("students")} className="hover:underline">
          Students
        </button>
        <button onClick={() => setPage("payments")} className="hover:underline">
          Payments
        </button>
        <button onClick={() => setPage("expenses")} className="hover:underline">
          Expenses
        </button>
      </nav>

      {/* Page Content */}
      <main className="p-6">
        {page === "dashboard" && <Dashboard />}
        {page === "students" && <StudentList />}
        {page === "payments" && <PaymentForm />}
        {page === "expenses" && <ExpenseForm />}
      </main>
    </div>
  )
}

export default App
