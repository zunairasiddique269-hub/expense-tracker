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
    </div>
  )
}

export default App