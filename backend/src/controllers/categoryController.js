import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../services/categoryService.js'


// Create Category
export const create = async (req, res) => {
  try {
    const { name, type } = req.body

    const category = await createCategory(
      req.user.userId,
      name,
      type
    )

    res.status(201).json({
      message: 'Category created successfully',
      category,
    })
  } catch (error) {
    console.error(error)

    res.status(400).json({
      message: error.message,
    })
  }
}


// Get All Categories
export const getAll = async (req, res) => {
  try {
    const categories = await getCategories(
      req.user.userId
    )

    res.status(200).json({
      categories,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: error.message,
    })
  }
}


// Get Single Category
export const getOne = async (req, res) => {
  try {
    const categoryId = Number(req.params.id)

    const category = await getCategoryById(
      req.user.userId,
      categoryId
    )

    res.status(200).json({
      category,
    })
  } catch (error) {
    console.error(error)

    res.status(404).json({
      message: error.message,
    })
  }
}


// Update Category
export const update = async (req, res) => {
  try {
    const categoryId = Number(req.params.id)
    const { name, type } = req.body

    const category = await updateCategory(
      req.user.userId,
      categoryId,
      name,
      type
    )

    res.status(200).json({
      message: 'Category updated successfully',
      category,
    })
  } catch (error) {
    console.error(error)

    res.status(400).json({
      message: error.message,
    })
  }
}


// Delete Category
export const remove = async (req, res) => {
  try {
    const categoryId = Number(req.params.id)

    const result = await deleteCategory(
      req.user.userId,
      categoryId
    )

    res.status(200).json(result)
  } catch (error) {
    console.error(error)

    res.status(400).json({
      message: error.message,
    })
  }
}