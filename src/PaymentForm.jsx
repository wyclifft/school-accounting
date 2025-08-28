// src/PaymentForm.jsx
import { useState, useEffect } from "react"
import { supabase } from "./supabaseClient"

function PaymentForm() {
  const [students, setStudents] = useState([])
  const [studentId, setStudentId] = useState("")
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [referenceNo, setReferenceNo] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    // fetch students for dropdown
    const fetchStudents = async () => {
      const { data, error } = await supabase.from("students").select("id, full_name, admission_no")
      if (error) {
        console.error("Error loading students:", error.message)
      } else {
        setStudents(data)
      }
    }
    fetchStudents()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    if (!studentId || !amount) {
      setMessage("⚠️ Please select a student and enter an amount")
      return
    }

    const { error } = await supabase.from("payments").insert([
      {
        student_id: studentId,
        amount: parseFloat(amount),
        payment_method: paymentMethod,
        reference_no: referenceNo || null,
      },
    ])

    if (error) {
      setMessage("❌ Error recording payment: " + error.message)
    } else {
      setMessage("✅ Payment recorded successfully!")
      setAmount("")
      setReferenceNo("")
      setStudentId("")
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Record Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student Dropdown */}
        <div>
          <label className="block mb-1">Student</label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Select Student --</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.full_name} ({s.admission_no})
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1">Amount (KSh)</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="cash">Cash</option>
            <option value="mpesa">M-Pesa</option>
            <option value="bank">Bank</option>
          </select>
        </div>

        {/* Reference No */}
        <div>
          <label className="block mb-1">Reference No (optional)</label>
          <input
            type="text"
            value={referenceNo}
            onChange={(e) => setReferenceNo(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Save Payment
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  )
}

export default PaymentForm
