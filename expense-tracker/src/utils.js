const STORAGE_KEY = 'expense-tracker-expenses'
export const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Other']

function isValidExpense(item) {
  return (
    item &&
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    Number.isFinite(Number(item.amount)) &&
    typeof item.category === 'string' &&
    typeof item.date === 'string'
  )
}

export function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `expense-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function loadExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isValidExpense).map((item) => ({
      id: item.id,
      name: item.name,
      amount: Number(item.amount),
      category: item.category,
      date: item.date,
    }))
  } catch {
    return []
  }
}

export function saveExpenses(expenses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  } catch {
    // Ignore storage failures so the app keeps working in memory.
  }
}

export function formatCurrency(value) {
  const number = Number(value)

  if (!Number.isFinite(number)) {
    return 'Rs. 0'
  }

  return `Rs. ${number.toLocaleString('en-PK', {
    maximumFractionDigits: 2,
  })}`
}

export function formatDate(value) {
  if (!value) {
    return '—'
  }

  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function getSummary(expenses) {
  const totalSpent = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  const totalExpenses = expenses.length
  const averageExpense = totalExpenses === 0 ? 0 : totalSpent / totalExpenses
  const highestExpense = totalExpenses === 0
    ? 0
    : Math.max(...expenses.map((expense) => Number(expense.amount)))

  return {
    totalSpent,
    totalExpenses,
    averageExpense,
    highestExpense,
  }
}
