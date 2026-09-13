import { formatCurrency, formatDate } from '../utils'

function ExpenseList({
  expenses,
  filteredExpenses,
  searchTerm,
  onSearchChange,
  onEdit,
  onDelete,
  onClearAll,
}) {
  const hasExpenses = expenses.length > 0
  const hasResults = filteredExpenses.length > 0

  return (
    <section className="list-card">
      <div className="list-header">
        <div>
          <h2>Expenses</h2>
          <p>Search, review, and manage your recorded expenses.</p>
        </div>

        <button
          type="button"
          className="btn btn-danger"
          onClick={onClearAll}
          disabled={!hasExpenses}
        >
          Clear All
        </button>
      </div>

      <div className="form-group search-group">
        <label htmlFor="expense-search">Search</label>
        <input
          id="expense-search"
          type="search"
          placeholder="Search by expense name or category"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>

      {!hasExpenses && (
        <div className="empty-state">
          <h3>No expenses yet</h3>
          <p>Add your first expense using the form above to start tracking your spending.</p>
        </div>
      )}

      {hasExpenses && !hasResults && (
        <div className="empty-state">
          <h3>No expenses found</h3>
          <p>Try a different name or category, or clear the search to see all expenses.</p>
        </div>
      )}

      {hasResults && (
        <div className="table-wrap">
          <table className="expense-table">
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
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td data-label="Expense">{expense.name}</td>
                  <td data-label="Amount">{formatCurrency(expense.amount)}</td>
                  <td data-label="Category">
                    <span className={`badge badge-${expense.category.toLowerCase()}`}>
                      {expense.category}
                    </span>
                  </td>
                  <td data-label="Date">{formatDate(expense.date)}</td>
                  <td data-label="Actions">
                    <div className="table-actions">
                      <button
                        type="button"
                        className="btn btn-secondary btn-small"
                        onClick={() => onEdit(expense)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger-outline btn-small"
                        onClick={() => onDelete(expense)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ExpenseList
