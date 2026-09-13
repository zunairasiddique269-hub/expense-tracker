import { useState } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [expenseName, setExpenseName] = useState('')
const [amount, setAmount] = useState('')
const [category, setCategory] = useState('Food')
const [date, setDate] = useState('')
const [searchTerm, setSearchTerm] = useState('')

const [editingIndex, setEditingIndex] = useState(null)
const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  return (
    <div>
    <h1>Expense Tracker</h1>

<div className="summary">
  <div className="summary-card">
    <h2>Total Spent</h2>
    <p>Rs. {total}</p>
  </div>

  <div className="summary-card">
    <h2>Total Expenses</h2>
    <p>{expenses.length}</p>
  </div>
</div>

      <div>
      <input
  type="text"
  placeholder="Expense name"
  value={expenseName}
  onChange={(e) => setExpenseName(e.target.value)}
/>
<input
  type="number"
  placeholder="Amount"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="Food">Food</option>
  <option value="Transport">Transport</option>
  <option value="Shopping">Shopping</option>
  <option value="Bills">Bills</option>
</select>

<input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>
<input
  type="text"
  placeholder="Search expenses"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
<button
  onClick={() => {
    if (editingIndex !== null) {
      const updatedExpenses = [...expenses]

      updatedExpenses[editingIndex] = {
        name: expenseName,
        amount: amount,
        category: category,
        date: date
      }

      setExpenses(updatedExpenses)
      setEditingIndex(null)
    } else {
      setExpenses([
        ...expenses,
        { name: expenseName, amount: amount, category: category, date: date }
      ])
    }

    setExpenseName('')
    setAmount('')
  }}
>
  {editingIndex !== null ? 'Update Expense' : 'Add Expense'}
</button>

<button
  onClick={() => {
    setExpenses([])
  }}
>
  Clear All
</button>
</div>

<div>
  <table>
    <thead>
      <tr>
        <th>Expense</th>
        <th>Amount</th>
        <th>Category</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {expenses
        .filter((expense) =>
          expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expense.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((expense, index) => (
          <tr key={index}>
            <td>{expense.name}</td>
            <td>Rs. {expense.amount}</td>
            <td>{expense.category}</td>
            <td>{expense.date}</td>
            <td>
              <button
                onClick={() => {
                  setEditingIndex(index)
                  setExpenseName(expense.name)
                  setAmount(expense.amount)
                  setCategory(expense.category)
                  setDate(expense.date)
                }}
              >
                Edit
              </button>

              <button
                onClick={() => {
                  setExpenses(expenses.filter((_, i) => i !== index))
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

    </div>
  )
}

export default App