import { body } from 'express-validator'

export const transactionValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Transaction title is required')
    .isLength({ min: 2 })
    .withMessage('Transaction title must be at least 2 characters'),

  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be greater than 0'),

  body('type')
    .notEmpty()
    .withMessage('Transaction type is required')
    .isIn(['INCOME', 'EXPENSE'])
    .withMessage('Type must be INCOME or EXPENSE'),

  body('categoryId')
    .notEmpty()
    .withMessage('Category is required')
    .isInt({ min: 1 })
    .withMessage('Category ID must be a valid number'),

  body('transactionDate')
    .notEmpty()
    .withMessage('Transaction date is required')
    .isISO8601()
    .withMessage('Transaction date must be a valid date'),
]