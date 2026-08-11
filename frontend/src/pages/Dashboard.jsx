import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { apiRequest } from '../api/api'

function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  })

  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setError('')

        // Dashboard summary
        const summaryData = await apiRequest(
          '/dashboard/summary'
        )

        setSummary(summaryData.summary)

        // Recent transactions
        const transactionData = await apiRequest(
          '/transactions'
        )

        setTransactions(
          transactionData.transactions.slice(0, 5)
        )
      } catch (error) {
        console.error(error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="dashboard-page">
          <h1>Loading...</h1>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="dashboard-page">

        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>
              Welcome back! Here's your expense overview.
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {/* Summary Cards */}
        <div className="summary-cards">

          <div className="summary-card">
            <p>Total Income</p>
            <h2>
              ${Number(summary.totalIncome).toFixed(2)}
            </h2>
          </div>

          <div className="summary-card">
            <p>Total Expenses</p>
            <h2>
              ${Number(summary.totalExpense).toFixed(2)}
            </h2>
          </div>

          <div className="summary-card">
            <p>Balance</p>
            <h2>
              ${Number(summary.balance).toFixed(2)}
            </h2>
          </div>

        </div>

        {/* Recent Transactions */}
        <div className="recent-transactions">

          <div className="section-header">
            <h2>Recent Transactions</h2>
          </div>

          <div className="transaction-list">

            {transactions.length === 0 ? (
              <p>No transactions found.</p>
            ) : (
              transactions.map((transaction) => (
                <div
                  className="transaction-item"
                  key={transaction.id}
                >
                  <div>
                    <h3>{transaction.title}</h3>

                    <p>
                      {transaction.category?.name}
                    </p>
                  </div>

                  <span
                    className={
                      transaction.type === 'INCOME'
                        ? 'income-amount'
                        : 'expense-amount'
                    }
                  >
                    {transaction.type === 'INCOME'
                      ? '+'
                      : '-'}
                    $
                    {Number(transaction.amount).toFixed(2)}
                  </span>
                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </>
  )
}

export default Dashboard