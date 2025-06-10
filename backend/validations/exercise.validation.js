import { body, validationResult } from 'express-validator';

export const validateCreateExercise = [
  body('name')
    .trim()
    .notEmpty().withMessage('Exercise name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('duration')
    .notEmpty().withMessage('Duration is required')
    .isFloat({ min: 0 }).withMessage('Duration must be a positive number'),
  
  body('caloriesBurned')
    .notEmpty().withMessage('Calories burned is required')
    .isFloat({ min: 0 }).withMessage('Calories burned must be a positive number'),
  
  body('date')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  
  body('type')
    .trim()
    .notEmpty().withMessage('Exercise type is required')
    .isIn(['Cardio', 'Strength', 'Flexibility', 'Other']).withMessage('Invalid exercise type'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateUpdateExercise = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('duration')
    .optional()
    .isFloat({ min: 0 }).withMessage('Duration must be a positive number'),
  
  body('caloriesBurned')
    .optional()
    .isFloat({ min: 0 }).withMessage('Calories burned must be a positive number'),
  
  body('date')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  
  body('type')
    .optional()
    .trim()
    .isIn(['Cardio', 'Strength', 'Flexibility', 'Other']).withMessage('Invalid exercise type'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]; 