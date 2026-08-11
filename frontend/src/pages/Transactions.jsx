import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { apiRequest } from '../api/api'

function Transactions() {
  // Transactions from backend
  const [transactions, setTransactions] = useState([])

  // Categories from backend
  const [categories, setCategories] = useState([])

  // Loading / Error
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Add transaction states
  const [type, setType] = useState('EXPENSE')
  const [title, setTitle] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')

  // Filter states
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('ALL')
  const [filterCategory, setFilterCategory] = useState('ALL')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  // Load transactions and categories
  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      const [transactionData, categoryData] =
        await Promise.all([
          apiRequest('/transactions'),
          apiRequest('/categories'),
        ])

      setTransactions(transactionData.transactions)
      setCategories(categoryData.categories)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Add Transaction
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !amount || !date || !categoryName.trim()) {
      alert('Please fill in all required fields.')
      return
    }

    try {
      setError('')

      // Find existing category by name and type
      let category = categories.find(
        (item) =>
          item.name.toLowerCase() ===
            categoryName.trim().toLowerCase() &&
          item.type === type
      )

      // If category doesn't exist, create it automatically
      if (!category) {
        const categoryData = await apiRequest(
          '/categories',
          {
            method: 'POST',
            body: JSON.stringify({
              name: categoryName.trim(),
              type: type,
            }),
          }
        )

        category = categoryData.category
      }

      // Create transaction
      await apiRequest('/transactions', {
        method: 'POST',
        body: JSON.stringify({
          title,
          amount: Number(amount),
          type,
          categoryId: category.id,
          transactionDate: date,
        }),
      })

      alert('Transaction added successfully')

      // Reset form
      setTitle('')
      setAmount('')
      setDate('')
      setCategoryName('')

      // Reload data
      await loadData()
    } catch (error) {
      console.error(error)
      setError(error.message)
    }
  }

  // Delete Transaction
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this transaction?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      setError('')

      await apiRequest(`/transactions/${id}`, {
        method: 'DELETE',
      })

      alert('Transaction deleted successfully')

      await loadData()
    } catch (error) {
      console.error(error)
      setError(error.message)
    }
  }

  // Clear Filters
  const clearFilters = () => {
    setSearch('')
    setFilterType('ALL')
    setFilterCategory('ALL')
    setFromDate('')
    setToDate('')
  }

  // Filter Transactions
  const filteredTransactions = transactions.filter(
    (transaction) => {
      // Search by title
      const matchesSearch = transaction.title
        .toLowerCase()
        .includes(search.toLowerCase())

      // Filter by type
      const matchesType =
        filterType === 'ALL' ||
        transaction.type === filterType

      // Filter by category
      const matchesCategory =
        filterCategory === 'ALL' ||
        String(transaction.categoryId) ===
          String(filterCategory)

      // Transaction date
      const transactionDate =
        transaction.transactionDate?.slice(0, 10)

      // From date
      const matchesFromDate =
        !fromDate || transactionDate >= fromDate

      // To date
      const matchesToDate =
        !toDate || transactionDate <= toDate

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesFromDate &&
        matchesToDate
      )
    }
  )

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="transactions-page">
          <h1>Loading transactions...</h1>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="transactions-page">

        {/* Page Header */}
        <div className="transactions-header">
          <h1>Transactions</h1>

          <p>
            Manage and filter your income and expenses.
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {/* Add Transaction */}
        <div className="transaction-form-card">

          <h2>Add Transaction</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-row">

              {/* Type */}
              <div className="form-group">
                <label>Type</label>

                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value)
                  }
                >
                  <option value="EXPENSE">
                    EXPENSE
                  </option>

                  <option value="INCOME">
                    INCOME
                  </option>
                </select>
              </div>

              {/* Title */}
              <div className="form-group">
                <label>Title</label>

                <input
                  type="text"
                  placeholder="e.g. Grocery Shopping"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                />
              </div>

            </div>

            <div className="form-row">

              {/* Category - USER WILL TYPE */}
              <div className="form-group">
                <label>Category</label>

                <input
                  type="text"
                  placeholder="e.g. Salary, Food, Rent"
                  value={categoryName}
                  onChange={(e) =>
                    setCategoryName(e.target.value)
                  }
                />
              </div>

              {/* Amount */}
              <div className="form-group">
                <label>Amount</label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                />
              </div>

            </div>

            {/* Date */}
            <div className="form-group">
              <label>Transaction Date</label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="add-transaction-button"
            >
              Add Transaction
            </button>

          </form>

        </div>

        {/* Search & Filters */}
        <div className="transaction-filter-card">

          <h2>Search & Filter Transactions</h2>

          {/* Search */}
          <div className="form-group">
            <label>Search by Title</label>

            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {/* Filter Row */}
          <div className="filter-row">

            {/* Type Filter */}
            <div className="form-group">
              <label>Type</label>

              <select
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value)
                }
              >
                <option value="ALL">
                  All Types
                </option>

                <option value="INCOME">
                  INCOME
                </option>

                <option value="EXPENSE">
                  EXPENSE
                </option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="form-group">
              <label>Category</label>

              <select
                value={filterCategory}
                onChange={(e) =>
                  setFilterCategory(e.target.value)
                }
              >
                <option value="ALL">
                  All Categories
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* From Date */}
            <div className="form-group">
              <label>From Date</label>

              <input
                type="date"
                value={fromDate}
                onChange={(e) =>
                  setFromDate(e.target.value)
                }
              />
            </div>

            {/* To Date */}
            <div className="form-group">
              <label>To Date</label>

              <input
                type="date"
                value={toDate}
                onChange={(e) =>
                  setToDate(e.target.value)
                }
              />
            </div>

          </div>

          <button
            type="button"
            className="clear-filter-button"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

        {/* Transaction History */}
        <div className="transaction-table-card">

          <div className="section-header">
            <h2>Transaction History</h2>

            <span className="transaction-count">
              {filteredTransactions.length}{' '}
              transaction(s)
            </span>
          </div>

          <div className="transaction-table">

            <div className="transaction-table-header">
              <span>Type</span>
              <span>Title</span>
              <span>Category</span>
              <span>Amount</span>
              <span>Date</span>
              <span>Action</span>
            </div>

            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(
                (transaction) => (
                  <div
                    className="transaction-table-row"
                    key={transaction.id}
                  >

                    <span
                      className={
                        transaction.type === 'INCOME'
                          ? 'income-badge'
                          : 'expense-badge'
                      }
                    >
                      {transaction.type}
                    </span>

                    <span>
                      {transaction.title}
                    </span>

                    <span>
                      {transaction.category?.name ||
                        'N/A'}
                    </span>

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
                      {Number(
                        transaction.amount
                      ).toFixed(2)}
                    </span>

                    <span>
                      {transaction.transactionDate?.slice(
                        0,
                        10
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          transaction.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>
                )
              )
            ) : (
              <div className="no-transactions">
                No transactions found.
              </div>
            )}

          </div>

        </div>

      </div>
    </>
  )
}

export default Transactions