import prisma from '../lib/prisma.js'

// Create Category
export const createCategory = async (userId, name, type) => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      name_userId: {
        name,
        userId,
      },
    },
  })

  if (existingCategory) {
    throw new Error('Category already exists')
  }

  const category = await prisma.category.create({
    data: {
      name,
      type,
      userId,
    },
  })

  return category
}


// Get All Categories
export const getCategories = async (userId) => {
  return await prisma.category.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}


// Get Single Category
export const getCategoryById = async (userId, categoryId) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      userId,
    },
  })

  if (!category) {
    throw new Error('Category not found')
  }

  return category
}


// Update Category
export const updateCategory = async (
  userId,
  categoryId,
  name,
  type
) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      userId,
    },
  })

  if (!category) {
    throw new Error('Category not found')
  }

  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name,
      type,
    },
  })

  return updatedCategory
}


// Delete Category
export const deleteCategory = async (userId, categoryId) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      userId,
    },
  })

  if (!category) {
    throw new Error('Category not found')
  }

  const transactionCount = await prisma.transaction.count({
    where: {
      categoryId,
      userId,
    },
  })

  if (transactionCount > 0) {
    throw new Error(
      'Cannot delete a category that has transactions'
    )
  }

  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  })

  return {
    message: 'Category deleted successfully',
  }
}