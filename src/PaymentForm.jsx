// src/PaymentForm.jsx
import { useState } from "react"

function PaymentForm() {
  const [formData, setFormData] = useState({
    student: "",
    amount: "",
    date: "",
  })

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Payment submitted for ${formData.student}`)
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Record Payment</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="student"
          placeholder="Student Name"
          value={formData.student}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Payment
        </button>
      </form>
    </div>
  )
}

export default PaymentForm
