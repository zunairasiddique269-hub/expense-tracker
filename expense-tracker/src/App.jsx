import { useState } from 'react'

function App() {
  const [expenses, setExpenses] = useState([])
  const [expenseName, setExpenseName] = useState('')
const [amount, setAmount] = useState('')

const [editingIndex, setEditingIndex] = useState(null)
const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  return (
    <div>
      <h1>Expense Tracker</h1>
      <h2>Total: Rs. {total}</h2>

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
<button
  onClick={() => {
    if (editingIndex !== null) {
      const updatedExpenses = [...expenses]

      updatedExpenses[editingIndex] = {
        name: expenseName,
        amount: amount
      }

      setExpenses(updatedExpenses)
      setEditingIndex(null)
    } else {
      setExpenses([
        ...expenses,
        { name: expenseName, amount: amount }
      ])
    }

    setExpenseName('')
    setAmount('')
  }}
>
  {editingIndex !== null ? 'Update Expense' : 'Add Expense'}
</button>
</div>

      <div>
  {expenses.map((expense, index) => (
   <div key={index}>
   <p>{expense.name}</p>
   <p>Rs. {expense.amount}</p>
   <button
  onClick={() => {
    setEditingIndex(index)
    setExpenseName(expense.name)
    setAmount(expense.amount)
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
 </div>
  ))}
</div>
    </div>
  )
}

export default App