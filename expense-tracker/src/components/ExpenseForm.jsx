import { CATEGORIES } from '../utils'

function ExpenseForm({
  expenseName,
  amount,
  category,
  date,
  errors,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form className="expense-form" onSubmit={onSubmit} noValidate>
      <div className="form-header">
        <h2>{isEditing ? 'Edit expense' : 'Add expense'}</h2>
        <p>
          {isEditing
            ? 'Update the selected expense, then save your changes.'
            : 'Enter the details below to record a new expense.'}
        </p>
      </div>

      {isEditing && (
        <p className="editing-banner" role="status">
          You are editing an existing expense.
        </p>
      )}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="expense-name">Expense Name</label>
          <input
            id="expense-name"
            name="expenseName"
            type="text"
            placeholder="e.g. Grocery shopping"
            value={expenseName}
            onChange={onChange}
            aria-invalid={Boolean(errors.expenseName)}
            aria-describedby={errors.expenseName ? 'expense-name-error' : undefined}
          />
          {errors.expenseName && (
            <p id="expense-name-error" className="field-error" role="alert">
              {errors.expenseName}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="expense-amount">Amount</label>
          <input
            id="expense-amount"
            name="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 1500"
            value={amount}
            onChange={onChange}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? 'expense-amount-error' : undefined}
          />
          {errors.amount && (
            <p id="expense-amount-error" className="field-error" role="alert">
              {errors.amount}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="expense-category">Category</label>
          <select
            id="expense-category"
            name="category"
            value={category}
            onChange={onChange}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? 'expense-category-error' : undefined}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.category && (
            <p id="expense-category-error" className="field-error" role="alert">
              {errors.category}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="expense-date">Date</label>
          <input
            id="expense-date"
            name="date"
            type="date"
            value={date}
            onChange={onChange}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'expense-date-error' : undefined}
          />
          {errors.date && (
            <p id="expense-date-error" className="field-error" role="alert">
              {errors.date}
            </p>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Expense' : 'Add Expense'}
        </button>

        {isEditing && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default ExpenseForm
