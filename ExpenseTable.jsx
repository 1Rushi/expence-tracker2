import React, { useState } from 'react';

export default function ExpenseTable({ expenses, onDelete, onEdit }) {
  return (
    <div className="expense-table-container">
      {/* <h2>Expenses</h2> */}
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <table className="expense-table">
          <thead>
            <tr>
              <th>Sr</th>
              <th>Expense Name</th>
              <th>Amount (₹)</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{e.name}</td>
                <td>{parseFloat(e.amount).toLocaleString()}</td>
                <td>
                  <button className='edit' onClick={() => onEdit(index)}>✏️Edit</button>
                  <button className='delete' onClick={() => onDelete(index)}>🗑️Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

