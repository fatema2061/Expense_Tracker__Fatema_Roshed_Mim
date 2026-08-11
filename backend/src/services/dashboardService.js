import prisma from '../lib/prisma.js'

export const getDashboardSummary = async (userId) => {
  const incomeResult = await prisma.transaction.aggregate({
    where: {
      userId,
      type: 'INCOME',
    },
    _sum: {
      amount: true,
    },
  })

  const expenseResult = await prisma.transaction.aggregate({
    where: {
      userId,
      type: 'EXPENSE',
    },
    _sum: {
      amount: true,
    },
  })

  const totalIncome = Number(incomeResult._sum.amount || 0)
  const totalExpense = Number(expenseResult._sum.amount || 0)
  const balance = totalIncome - totalExpense

  return {
    totalIncome,
    totalExpense,
    balance,
  }
}