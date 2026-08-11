import { body } from 'express-validator'

export const categoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2 })
    .withMessage('Category name must be at least 2 characters'),

  body('type')
    .notEmpty()
    .withMessage('Category type is required')
    .isIn(['INCOME', 'EXPENSE'])
    .withMessage('Type must be INCOME or EXPENSE'),
]