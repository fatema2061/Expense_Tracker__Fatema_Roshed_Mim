import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import prisma from './lib/prisma.js'

import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/dashboard', dashboardRoutes)

// Test API
app.get('/', (req, res) => {
  res.json({
    message: 'Expense Tracker API is running',
  })
})

// Test Database Connection
app.get('/api/test-db', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`

    res.json({
      message: 'Database connection successful',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Database connection failed',
    })
  }
})

// Error handling middleware
app.use(errorMiddleware)

// Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})