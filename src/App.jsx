import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, CreditCard, Receipt, Menu, X } from 'lucide-react';
import Dashboard from './Dashboard';
import StudentList from './StudentList';
import PaymentForm from './PaymentForm';
import ExpenseForm from './ExpenseForm';

const App = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Smith', grade: '10th', status: 'Active', pendingFees: 500 },
    { id: 2, name: 'Sarah Johnson', grade: '9th', status: 'Active', pendingFees: 0 },
    { id: 3, name: 'Mike Davis', grade: '11th', status: 'Active', pendingFees: 750 },
    { id: 4, name: 'Emma Wilson', grade: '10th', status: 'Inactive', pendingFees: 1200 },
    { id: 5, name: 'Alex Brown', grade: '12th', status: 'Active', pendingFees: 300 }
  ]);

  const [payments, setPayments] = useState([
    { id: 1, studentName: 'John Smith', amount: 500, date: '2024-01-15', description: 'Tuition Fee' },
    { id: 2, studentName: 'Sarah Johnson', amount: 1200, date: '2024-01-10', description: 'Annual Fee' }
  ]);

  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Office Supplies', amount: 250, date: '2024-01-12', category: 'Supplies' },
    { id: 2, description: 'Electricity Bill', amount: 800, date: '2024-01-08', category: 'Utilities' }
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <MainContent 
          students={students}
          setStudents={setStudents}
          payments={payments}
          setPayments={setPayments}
          expenses={expenses}
          setExpenses={setExpenses}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
    </Router>
  );
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/students', icon: Users, label: 'Students' },
    { path: '/payments', icon: CreditCard, label: 'Payments' },
    { path: '/expenses', icon: Receipt, label: 'Expenses' }
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${
        sidebarOpen ? 'block' : 'hidden'
      }`} onClick={() => setSidebarOpen(false)} />
      
      <motion.div 
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
        className="fixed lg:relative lg:translate-x-0 z-50 w-64 h-full bg-white shadow-xl lg:shadow-lg"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">School Finance</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-500' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </motion.div>
    </>
  );
};

const MainContent = ({ students, setStudents, payments, setPayments, expenses, setExpenses, setSidebarOpen }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-4"
          >
            <Menu size={20} />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">School Accounting System</h2>
        </div>
      </header>
      
      <main className="flex-1 overflow-auto p-6">
        <Routes>
          <Route path="/" element={
            <Dashboard 
              students={students} 
              payments={payments} 
              expenses={expenses} 
            />
          } />
          <Route path="/students" element={
            <StudentList 
              students={students} 
              setStudents={setStudents} 
            />
          } />
          <Route path="/payments" element={
            <PaymentForm 
              students={students}
              setStudents={setStudents}
              payments={payments}
              setPayments={setPayments}
            />
          } />
          <Route path="/expenses" element={
            <ExpenseForm 
              expenses={expenses}
              setExpenses={setExpenses}
            />
          } />
        </Routes>
      </main>
    </div>
  );
};

export default App;