import { ok } from 'node:assert'
import prisma from '../lib/prisma.js'

// Create Transaction
export const createTransaction = async (
  userId,
  title,
  amount,
  type,
  categoryId,
  transactionDate
) => {
  // Check category belongs to this user
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      userId,
    },
  })

  if (!category) {
    throw new Error('Category not found')
  }

  // Category type must match transaction type
  if (category.type !== type) {
    throw new Error(
      'Transaction type must match category type'
    )
  }

  const transaction = await prisma.transaction.create({
    data: {
      title,
      amount,
      type,
      categoryId,
      transactionDate: new Date(transactionDate),
      userId,
    },
    include: {
      category: true,
    },
  })

  return transaction
}


// Get All Transactions
export const getTransactions = async (
  userId,
  filters = {}
) => {
  const {
    type,
    categoryId,
    startDate,
    endDate,
  } = filters

  const where = {
    userId,
  }

  // Type filter
  if (type) {
    where.type = type
  }

  // Category filter
  if (categoryId) {
    where.categoryId = Number(categoryId)
  }

  // Date range filter
  if (startDate || endDate) {
    where.transactionDate = {}

    if (startDate) {
      where.transactionDate.gte = new Date(startDate)
    }

    if (endDate) {
      const end = new Date(endDate)

      // Include the entire end date
      end.setHours(23, 59, 59, 999)

      where.transactionDate.lte = end
    }
  }

  return await prisma.transaction.findMany({
    where,
    include: {
      category: true,
    },
    orderBy: {
      transactionDate: 'desc',
    },
  })
}


// Get Single Transaction
export const getTransactionById = async (
  userId,
  transactionId
) => {
  const transaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      userId,
    },
    include: {
      category: true,
    },
  })

  if (!transaction) {
    throw new Error('Transaction not found')
  }

  return transaction
}


// Update Transaction
export const updateTransaction = async (
  userId,
  transactionId,
  title,
  amount,
  type,
  categoryId,
  transactionDate
) => {
  // Check transaction belongs to user
  const existingTransaction =
    await prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    })

  if (!existingTransaction) {
    throw new Error('Transaction not found')
  }

  // Check category belongs to user
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      userId,
    },
  })

  if (!category) {
    throw new Error('Category not found')
  }

  // Category type must match transaction type
  if (category.type !== type) {
    throw new Error(
      'Transaction type must match category type'
    )
  }

  const transaction = await prisma.transaction.update({
    where: {
      id: transactionId,
    },
    data: {
      title,
      amount,
      type,
      categoryId,
      transactionDate: new Date(transactionDate),
    },
    include: {
      category: true,
    },
  })

  return transaction
}


// Delete Transaction
export const deleteTransaction = async (
  userId,
  transactionId
) => {
  const transaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      userId,
    },
  })

  if (!transaction) {
    throw new Error('Transaction not found')
  }

  await prisma.transaction.delete({
    where: {
      id: transactionId,
    },
  })

  return {
    message: 'Transaction deleted successfully',
  }
}