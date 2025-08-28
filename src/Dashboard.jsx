import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, CreditCard, Receipt, AlertCircle, TrendingUp, BarChart3, PieChart } from 'lucide-react';

const Dashboard = ({ students, payments, expenses }) => {
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'Active').length;
  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingFees = students.reduce((sum, student) => sum + student.pendingFees, 0);
  const netIncome = totalPayments - totalExpenses;

  const statsCards = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Active Students',
      value: activeStudents,
      icon: UserCheck,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Total Payments',
      value: `$${totalPayments.toLocaleString()}`,
      icon: CreditCard,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    {
      title: 'Total Expenses',
      value: `$${totalExpenses.toLocaleString()}`,
      icon: Receipt,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
    {
      title: 'Pending Fees',
      value: `$${pendingFees.toLocaleString()}`,
      icon: AlertCircle,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      title: 'Net Income',
      value: `$${netIncome.toLocaleString()}`,
      icon: TrendingUp,
      color: netIncome >= 0 ? 'bg-green-500' : 'bg-red-500',
      bgColor: netIncome >= 0 ? 'bg-green-50' : 'bg-red-50',
      textColor: netIncome >= 0 ? 'text-green-700' : 'text-red-700'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`${card.bgColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder 
          title="Monthly Revenue" 
          icon={BarChart3}
          description="Revenue trends over the past 6 months"
        />
        <ChartPlaceholder 
          title="Expense Categories" 
          icon={PieChart}
          description="Breakdown of expenses by category"
        />
      </div>

      <RecentActivity payments={payments} expenses={expenses} />
    </div>
  );
};

const ChartPlaceholder = ({ title, icon: Icon, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Icon size={20} className="text-gray-400" />
      </div>
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Icon size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">{description}</p>
          <p className="text-gray-400 text-xs mt-2">Chart ready for integration</p>
        </div>
      </div>
    </motion.div>
  );
};

const RecentActivity = ({ payments, expenses }) => {
  const recentPayments = payments.slice(-3).reverse();
  const recentExpenses = expenses.slice(-3).reverse();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h3>
        <div className="space-y-3">
          {recentPayments.length > 0 ? recentPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{payment.studentName}</p>
                <p className="text-sm text-gray-600">{payment.description}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">${payment.amount}</p>
                <p className="text-xs text-gray-500">{payment.date}</p>
              </div>
            </div>
          )) : (
            <p className="text-gray-500 text-center py-4">No recent payments</p>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h3>
        <div className="space-y-3">
          {recentExpenses.length > 0 ? recentExpenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{expense.description}</p>
                <p className="text-sm text-gray-600">{expense.category}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-red-600">-${expense.amount}</p>
                <p className="text-xs text-gray-500">{expense.date}</p>
              </div>
            </div>
          )) : (
            <p className="text-gray-500 text-center py-4">No recent expenses</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;