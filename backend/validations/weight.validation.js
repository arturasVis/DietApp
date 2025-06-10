import { body, validationResult } from 'express-validator';

export const validateCreateWeight = [
  body('weight')
    .notEmpty().withMessage('Weight is required')
    .isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
  
  body('date')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Notes must be less than 500 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateUpdateWeight = [
  body('weight')
    .optional()
    .isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
  
  body('date')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Notes must be less than 500 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]; 