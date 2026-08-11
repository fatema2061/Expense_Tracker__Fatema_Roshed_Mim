import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from '../services/transactionService.js'


// Create Transaction
export const create = async (req, res) => {
  try {
    const {
      title,
      amount,
      type,
      categoryId,
      transactionDate,
    } = req.body

    const transaction = await createTransaction(
      req.user.userId,
      title,
      amount,
      type,
      Number(categoryId),
      transactionDate
    )

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction,
    })
  } catch (error) {
    console.error(error)

    res.status(400).json({
      message: error.message,
    })
  }
}


// Get All Transactions + Filters
export const getAll = async (req, res) => {
  try {
    const {
      type,
      categoryId,
      startDate,
      endDate,
    } = req.query

    const transactions = await getTransactions(
      req.user.userId,
      {
        type,
        categoryId,
        startDate,
        endDate,
      }
    )

    res.status(200).json({
      transactions,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: error.message,
    })
  }
}


// Get Single Transaction
export const getOne = async (req, res) => {
  try {
    const transactionId = Number(req.params.id)

    const transaction = await getTransactionById(
      req.user.userId,
      transactionId
    )

    res.status(200).json({
      transaction,
    })
  } catch (error) {
    console.error(error)

    res.status(404).json({
      message: error.message,
    })
  }
}


// Update Transaction
export const update = async (req, res) => {
  try {
    const transactionId = Number(req.params.id)

    const {
      title,
      amount,
      type,
      categoryId,
      transactionDate,
    } = req.body

    const transaction = await updateTransaction(
      req.user.userId,
      transactionId,
      title,
      amount,
      type,
      Number(categoryId),
      transactionDate
    )

    res.status(200).json({
      message: 'Transaction updated successfully',
      transaction,
    })
  } catch (error) {
    console.error(error)

    res.status(400).json({
      message: error.message,
    })
  }
}


// Delete Transaction
export const remove = async (req, res) => {
  try {
    const transactionId = Number(req.params.id)

    const result = await deleteTransaction(
      req.user.userId,
      transactionId
    )

    res.status(200).json(result)
  } catch (error) {
    console.error(error)

    res.status(400).json({
      message: error.message,
    })
  }
}