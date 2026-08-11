import express from 'express'

import authMiddleware from '../middleware/authMiddleware.js'

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from '../controllers/categoryController.js'

import {
  categoryValidation,
} from '../validators/categoryValidator.js'

import {
  handleValidationErrors,
} from '../validators/authValidator.js'

const router = express.Router()

// Create Category
router.post(
  '/',
  authMiddleware,
  categoryValidation,
  handleValidationErrors,
  create
)

// Get All Categories
router.get(
  '/',
  authMiddleware,
  getAll
)

// Get Single Category
router.get(
  '/:id',
  authMiddleware,
  getOne
)

// Update Category
router.put(
  '/:id',
  authMiddleware,
  categoryValidation,
  handleValidationErrors,
  update
)

// Delete Category
router.delete(
  '/:id',
  authMiddleware,
  remove
)

export default router