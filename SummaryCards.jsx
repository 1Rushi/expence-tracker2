import React from 'react';

export default function SummaryCards({ budget, expense, remaining, onOpenBudgetModal, onOpenExpenseModal, selectedCategory, setSelectedCategory}) {
  return (
    <div className="name">
      <h1>Hello, Rushi</h1>
      <div className="summary-cards">
        <div className="card1">Total Budget<br /><strong className="price">₹{budget.toLocaleString()}</strong></div>
        <div className="card1">Total Expense<br /><strong className="price">₹{expense.toLocaleString()}</strong></div>
        <div className="card1">Remaining Budget<br /><strong className="price">₹{remaining.toLocaleString()}</strong></div>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <span className="icon">🔍</span>
          <input type="text" placeholder="Search" />
        </div>
        <button className="category" onClick={() => setSelectedCategory("All")}>💰 All Expenses</button>
        <button className="category" onClick={() => setSelectedCategory("Food & Drinks")}>🍕 Food & Drinks</button>
        <button className="category" onClick={() => setSelectedCategory("Groceries")}>🛍️ Groceries</button>
        <button className="category" onClick={() => setSelectedCategory("Travel")}>🧳 Travel</button>
        <button className="category" onClick={() => setSelectedCategory("Health")}>🛡️ Health</button>

        <button className="action" onClick={onOpenBudgetModal}><span>+</span> Add Budget</button>
        <button className="action" onClick={onOpenExpenseModal}><span>+</span> Add Expense</button>
      </div>
    </div>
  );
}
