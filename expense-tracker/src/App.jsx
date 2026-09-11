import { useState } from 'react'

function App() {
  const [expenses, setExpenses] = useState([])
  const [expenseName, setExpenseName] = useState('')
const [amount, setAmount] = useState('')
  return (
    <div>
      <h1>Expense Tracker</h1>

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
    setExpenses([
      ...expenses,
      { name: expenseName, amount: amount }
    ])
    setExpenseName('')
    setAmount('')
  }}
>
  Add Expense
</button>
      </div>

      <div>
  {expenses.map((expense, index) => (
    <div key={index}>
      <p>{expense.name}</p>
      <p>Rs. {expense.amount}</p>
    </div>
  ))}
</div>
    </div>
  )
}

export default App