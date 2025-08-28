import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"

function Dashboard() {
  const [totalFees, setTotalFees] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // Total Payments
    const { data: payments } = await supabase
      .from("payments")
      .select("amount")

    // Total Expenses
    const { data: expenses } = await supabase
      .from("expenses")
      .select("amount")

    // Balances
    const { data: balances } = await supabase
      .from("students_balance")
      .select("balance")

    if (payments) setTotalFees(payments.reduce((acc, p) => acc + Number(p.amount), 0))
    if (expenses) setTotalExpenses(expenses.reduce((acc, e) => acc + Number(e.amount), 0))
    if (balances) setBalance(balances.reduce((acc, b) => acc + Number(b.balance), 0))
  }

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold">Total Fees Collected</h3>
        <p className="text-2xl font-bold">Ksh {totalFees}</p>
      </div>

      <div className="bg-red-500 text-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold">Total Expenses</h3>
        <p className="text-2xl font-bold">Ksh {totalExpenses}</p>
      </div>

      <div className="bg-green-500 text-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold">Outstanding Balance</h3>
        <p className="text-2xl font-bold">Ksh {balance}</p>
      </div>
    </div>
  )
}

export default Dashboard
