import { useState } from "react"
import { supabase } from "./supabaseClient"

function ExpensesForm() {
  const [item, setItem] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("General")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!item || !amount) {
      setMessage("Please enter all details")
      return
    }

    const { error } = await supabase.from("expenses").insert([
      {
        item,
        amount,
        category,
      },
    ])

    if (error) {
      setMessage("Error: " + error.message)
    } else {
      setMessage("Expense recorded successfully ✅")
      setItem("")
      setAmount("")
    }
  }

  return (
    <div className="p-6 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Record Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Expense Item"
          className="border p-2 rounded w-full"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>General</option>
          <option>Maintenance</option>
          <option>Salaries</option>
          <option>Supplies</option>
          <option>Utilities</option>
        </select>

        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Save Expense
        </button>
      </form>

      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  )
}

export default ExpensesForm
