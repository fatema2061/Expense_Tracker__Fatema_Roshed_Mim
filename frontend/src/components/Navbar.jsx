import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="navbar">

      <div className="navbar-title">
        Expense Tracker
      </div>

      <div className="navbar-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/transactions">
          Transactions
        </Link>

        <Link to="/categories">
          Categories
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>

      </div>

    </nav>
  )
}

export default Navbar