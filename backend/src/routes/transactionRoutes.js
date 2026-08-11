import express from 'express'

import authMiddleware from '../middleware/authMiddleware.js'

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from '../controllers/transactionController.js'

import {
  transactionValidation,
} from '../validators/transactionValidator.js'

import {
  handleValidationErrors,
} from '../validators/authValidator.js'

const router = express.Router()

// Create Transaction
router.post(
  '/',
  authMiddleware,
  transactionValidation,
  handleValidationErrors,
  create
)

// Get All Transactions + Filters
router.get(
  '/',
  authMiddleware,
  getAll
)

// Get Single Transaction
router.get(
  '/:id',
  authMiddleware,
  getOne
)

// Update Transaction
router.put(
  '/:id',
  authMiddleware,
  transactionValidation,
  handleValidationErrors,
  update
)

// Delete Transaction
router.delete(
  '/:id',
  authMiddleware,
  remove
)

export default router