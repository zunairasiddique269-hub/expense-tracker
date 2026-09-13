import { useEffect, useMemo, useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SummaryCards from './components/SummaryCards'
import { createId, getSummary, loadExpenses, saveExpenses } from './utils'
import './App.css'

const emptyForm = {
  expenseName: '',
  amount: '',
  category: '',
  date: '',
}

function App() {
  const [expenses, setExpenses] = useState(() => loadExpenses())
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    saveExpenses(expenses)
  }, [expenses])

  const summary = useMemo(() => getSummary(expenses), [expenses])

  const filteredExpenses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return expenses
    }

    return expenses.filter(
      (expense) =>
        expense.name.toLowerCase().includes(query) ||
        expense.category.toLowerCase().includes(query),
    )
  }, [expenses, searchTerm])

  function resetForm() {
    setForm(emptyForm)
    setErrors({})
    setEditingId(null)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function validateForm() {
    const nextErrors = {}
    const trimmedName = form.expenseName.trim()
    const amountValue = Number(form.amount)

    if (!trimmedName) {
      nextErrors.expenseName = 'Please enter an expense name.'
    }

    if (form.amount === '' || form.amount === null) {
      nextErrors.amount = 'Please enter an amount.'
    } else if (!Number.isFinite(amountValue)) {
      nextErrors.amount = 'Please enter a valid amount.'
    } else if (amountValue <= 0) {
      nextErrors.amount = 'Amount must be greater than 0.'
    }

    if (!form.category) {
      nextErrors.category = 'Please select a category.'
    }

    if (!form.date) {
      nextErrors.date = 'Please choose a date.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const expenseData = {
      name: form.expenseName.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    }

    if (editingId) {
      setExpenses((current) =>
        current.map((expense) =>
          expense.id === editingId ? { ...expense, ...expenseData } : expense,
        ),
      )
    } else {
      setExpenses((current) => [
        ...current,
        {
          id: createId(),
          ...expenseData,
        },
      ])
    }

    resetForm()
  }

  function handleEdit(expense) {
    setForm({
      expenseName: expense.name,
      amount: String(expense.amount),
      category: expense.category,
      date: expense.date,
    })
    setErrors({})
    setEditingId(expense.id)
  }

  function handleDelete(expense) {
    const confirmed = window.confirm(`Delete "${expense.name}"?`)
    if (!confirmed) {
      return
    }

    setExpenses((current) => current.filter((item) => item.id !== expense.id))

    if (editingId === expense.id) {
      resetForm()
    }
  }

  function handleClearAll() {
    if (expenses.length === 0) {
      return
    }

    const confirmed = window.confirm('Clear all expenses? This cannot be undone.')
    if (!confirmed) {
      return
    }

    setExpenses([])
    resetForm()
  }

  return (
    <div className="app">
      <header className="page-header">
        <p className="eyebrow">Personal finance</p>
        <h1>Expense Tracker</h1>
        <p className="subtitle">
          Record daily spending, search your history, and keep a clear view of totals.
        </p>
      </header>

      <SummaryCards
        totalSpent={summary.totalSpent}
        totalExpenses={summary.totalExpenses}
        averageExpense={summary.averageExpense}
        highestExpense={summary.highestExpense}
      />

      <ExpenseForm
        expenseName={form.expenseName}
        amount={form.amount}
        category={form.category}
        date={form.date}
        errors={errors}
        isEditing={Boolean(editingId)}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      <ExpenseList
        expenses={expenses}
        filteredExpenses={filteredExpenses}
        searchTerm={searchTerm}
        onSearchChange={(event) => setSearchTerm(event.target.value)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onClearAll={handleClearAll}
      />
    </div>
  )
}

export default App
