import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import Nav from './nav';
import SummaryCards from './SummaryCards';
import ExpenseTable from './ExpenseTable';
import BudgetPieChart from './BudgetPieChart';
import CategoryBarChart from './CategoryBarChart';


function App() {
  const [totalBudget, setTotalBudget] = useState(() => {
    const storedBudget = localStorage.getItem('budget');
    return storedBudget ? JSON.parse(storedBudget) : 0;
  });
  
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem('expenses');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [newBudget, setNewBudget] = useState('');
  const [expenseForms, setExpenseForms] = useState([
    { name: '', date: '', category: '', amount: '' },
  ]);
  const [editIndex, setEditIndex] = useState(null);
  const [editExpense, setEditExpense] = useState({
    name: '',
    date: '',
    category: '',
    amount: ''
  });



// Save budget to localStorage
useEffect(() => {
  localStorage.setItem('budget', JSON.stringify(totalBudget));
}, [totalBudget]);

// Save expenses to localStorage
useEffect(() => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}, [expenses]);



  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const remaining = totalBudget - totalExpense;

  const handleAddBudget = () => {
    const value = parseFloat(newBudget);
    if (!isNaN(value) && value > 0) {
      setTotalBudget(prev => prev + value);
      setNewBudget('');
      setShowBudgetModal(false);
    }
  };

  const handleAddExpense = () => {
    const validExpenses = expenseForms.filter(e => e.name && e.date && e.category && e.amount);
    setExpenses(prev => [...prev, ...validExpenses]);
    setExpenseForms([{ name: '', date: '', category: '', amount: '' }]);
    setShowExpenseModal(false);
  };

  const handleExpenseChange = (index, field, value) => {
    const updated = [...expenseForms];
    updated[index][field] = value;
    setExpenseForms(updated);
  };

  

  // Expence Table

  const handleDeleteExpense = (index) => {
    const updated = [...expenses];
    updated.splice(index, 1);
    setExpenses(updated);
  };


  const handleEditExpense = (index) => {
    setEditIndex(index);
    setEditExpense({
      name: expenses[index].name,
      date: expenses[index].date,
      category: expenses[index].category,
      amount: expenses[index].amount
    });
  };

  const handleUpdateExpense = () => {
    const updated = [...expenses];
    updated[editIndex] = { ...editExpense };
    setExpenses(updated);
    setEditIndex(null);
    setEditExpense({ name: '', date: '', category: '', amount: '' });
  };

  return (
    <>
      <Nav />
      <SummaryCards
        budget={totalBudget}
        expense={totalExpense}
        remaining={remaining}
        onOpenBudgetModal={() => setShowBudgetModal(true)}
        onOpenExpenseModal={() => setShowExpenseModal(true)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Budget Modal */}
      {showBudgetModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="modal-close" onClick={() => setShowBudgetModal(false)}>×</span>
            <h2>Add Budget</h2>
            <a></a>
            Amount*
            <input
              type="number"
              placeholder="Enter budget amount"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
            />
            <button onClick={handleAddBudget}> Add Budget</button>
          </div>
        </div>
      )}

      {/* Expense Modal */}
      {showExpenseModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="modal-close" onClick={() => setShowExpenseModal(false)}>×</span>
            <h2>Add Expense</h2>
            <a></a>
            <div className="expense-form">Expence name*
              <input
                type="text"
                placeholder="Name"
                value={expenseForms[0].name}
                onChange={(e) => handleExpenseChange(0, 'name', e.target.value)}
              />Date*
              <input
                type="date"
                value={expenseForms[0].date}
                onChange={(e) => handleExpenseChange(0, 'date', e.target.value)}
              />Category*
              <select
                value={expenseForms[0].category}
                onChange={(e) => handleExpenseChange(0, 'category', e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Food & Drinks">🍕 Food & Drinks</option>
                <option value="Groceries">🛍️ Groceries</option>
                <option value="Travel">🧳 Travel</option>
                <option value="Health">🛡️ Health</option>
              </select>Amount*
              <input
                type="number"
                placeholder="Amount"
                value={expenseForms[0].amount}
                onChange={(e) => handleExpenseChange(0, 'amount', e.target.value)}
              />
            </div>
            <button onClick={handleAddExpense}>Add Expense</button>
          </div>
        </div>
      )}


      {editIndex !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="modal-close" onClick={() => setEditIndex(null)}>×</span>
            <h2>Edit Expense</h2>

            <div className="expense-form">Expence name*
              <input
                type="text"
                placeholder="Name"
                value={editExpense.name}
                onChange={(e) => setEditExpense({ ...editExpense, name: e.target.value })}
              />Date*
              <input
                type="date"
                value={editExpense.date}
                onChange={(e) => setEditExpense({ ...editExpense, date: e.target.value })}
              />Category*
              <select
                value={editExpense.category}
                onChange={(e) => setEditExpense({ ...editExpense, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Food & Drinks">🍕 Food & Drinks</option>
                <option value="Groceries">🛍️ Groceries</option>
                <option value="Travel">🧳 Travel</option>
                <option value="Health">🛡️ Health</option>
              </select>Amount*
              <input
                type="number"
                placeholder="Amount"
                value={editExpense.amount}
                onChange={(e) => setEditExpense({ ...editExpense, amount: e.target.value })}
              />
            </div>

            <button onClick={handleUpdateExpense}>Update</button>
          </div>
        </div>
      )}


      <div className="charts-wrapper" style={{ display: "flex", gap: "2rem" }}>
        <BudgetPieChart expenses={expenses} />
        <CategoryBarChart expenses={expenses} />
      </div>

      <ExpenseTable
        expenses={
          selectedCategory === "All"
            ? expenses
            : expenses.filter(e => e.category === selectedCategory)
        }
        onDelete={handleDeleteExpense}
        onEdit={handleEditExpense}
      />

    </>
  );
}

export default App;

