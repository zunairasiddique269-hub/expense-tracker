import { formatCurrency } from '../utils'

function SummaryCards({ totalSpent, totalExpenses, averageExpense, highestExpense }) {
  return (
    <section className="summary" aria-label="Expense summary">
      <article className="summary-card summary-card--spent">
        <h2>Total Spent</h2>
        <p>{formatCurrency(totalSpent)}</p>
      </article>

      <article className="summary-card summary-card--count">
        <h2>Total Expenses</h2>
        <p>{totalExpenses}</p>
      </article>

      <article className="summary-card summary-card--average">
        <h2>Average Expense</h2>
        <p>{formatCurrency(averageExpense)}</p>
      </article>

      <article className="summary-card summary-card--highest">
        <h2>Highest Expense</h2>
        <p>{formatCurrency(highestExpense)}</p>
      </article>
    </section>
  )
}

export default SummaryCards
