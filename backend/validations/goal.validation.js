import { body, validationResult } from 'express-validator';

export const validateCreateGoal = [
  body('type')
    .trim()
    .notEmpty().withMessage('Goal type is required')
    .isIn(['Weight', 'Calories', 'Exercise']).withMessage('Invalid goal type'),
  
  body('target')
    .notEmpty().withMessage('Target is required')
    .isFloat().withMessage('Target must be a number'),
  
  body('startDate')
    .optional()
    .isISO8601().withMessage('Invalid start date format'),
  
  body('endDate')
    .notEmpty().withMessage('End date is required')
    .isISO8601().withMessage('Invalid end date format')
    .custom((endDate, { req }) => {
      if (req.body.startDate && new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  body('currentValue')
    .optional()
    .isFloat().withMessage('Current value must be a number'),
  
  body('status')
    .optional()
    .isIn(['Active', 'Completed', 'Abandoned']).withMessage('Invalid status'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateUpdateGoal = [
  body('type')
    .optional()
    .trim()
    .isIn(['Weight', 'Calories', 'Exercise']).withMessage('Invalid goal type'),
  
  body('target')
    .optional()
    .isFloat().withMessage('Target must be a number'),
  
  body('startDate')
    .optional()
    .isISO8601().withMessage('Invalid start date format'),
  
  body('endDate')
    .optional()
    .isISO8601().withMessage('Invalid end date format')
    .custom((endDate, { req }) => {
      if (req.body.startDate && new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  body('currentValue')
    .optional()
    .isFloat().withMessage('Current value must be a number'),
  
  body('status')
    .optional()
    .isIn(['Active', 'Completed', 'Abandoned']).withMessage('Invalid status'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]; 