import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Categories from './pages/Categories'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route
            path="/categories"
            element={<Categories />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App