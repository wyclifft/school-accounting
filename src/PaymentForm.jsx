import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus, CheckCircle, Calendar, DollarSign, User, FileText } from 'lucide-react';

const PaymentForm = ({ students, setStudents, payments, setPayments }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.amount || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (amount <= 0) {
      alert('Amount must be greater than 0');
      return;
    }

    const newPayment = {
      id: Date.now(),
      studentName: formData.studentName,
      amount: amount,
      date: formData.date,
      description: formData.description || 'Payment'
    };

    setPayments(prev => [...prev, newPayment]);

    setStudents(prev => prev.map(student => {
      if (student.name === formData.studentName) {
        return {
          ...student,
          pendingFees: Math.max(0, student.pendingFees - amount)
        };
      }
      return student;
    }));

    setFormData({
      studentName: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const recentPayments = payments.slice(-5).reverse();
  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600 mt-1">Record student payments and track transactions</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Payments</p>
          <p className="text-lg font-semibold text-green-600">${totalPayments.toLocaleString()}</p>
        </div>
      </div>

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center"
        >
          <CheckCircle size={20} className="text-green-600 mr-3" />
          <p className="text-green-800">Payment recorded successfully!</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Plus size={20} className="text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 ml-3">Record New Payment</h2>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="inline mr-2" />
                Student Name *
              </label>
              <select
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select a student</option>
                {students.map(student => (
                  <option key={student.id} value={student.name}>
                    {student.name} - {student.grade} (Pending: ${student.pendingFees})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign size={16} className="inline mr-2" />
                Amount *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-2" />
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText size={16} className="inline mr-2" />
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="e.g., Tuition Fee, Lab Fee, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
            >
              <CreditCard size={16} className="mr-2" />
              Record Payment
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
          </div>
          
          <div className="p-6">
            {recentPayments.length > 0 ? (
              <div className="space-y-4">
                {recentPayments.map((payment, index) => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 bg-green-50 rounded-lg border border-green-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{payment.studentName}</h3>
                      <span className="text-lg font-semibold text-green-600">
                        ${payment.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{payment.description}</span>
                      <span>{new Date(payment.date).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No payments recorded yet</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CreditCard size={20} className="text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Payments</p>
              <p className="text-lg font-semibold text-gray-900">${totalPayments.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText size={20} className="text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-lg font-semibold text-gray-900">{payments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <DollarSign size={20} className="text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Average Payment</p>
              <p className="text-lg font-semibold text-gray-900">
                ${payments.length > 0 ? (totalPayments / payments.length).toFixed(0) : '0'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;