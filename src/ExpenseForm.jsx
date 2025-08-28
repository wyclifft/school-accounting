// src/ExpenseForm.jsx
import { useState } from "react"

function ExpenseForm() {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
  })

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Expense recorded: ${formData.description}`)
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Record Expense</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          placeholder="Expense Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Submit Expense
        </button>
      </form>
    </div>
  )
}

export default ExpenseForm
