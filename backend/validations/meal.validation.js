import { body, validationResult } from 'express-validator';

export const validateCreateMeal = [
  body('name')
    .trim()
    .notEmpty().withMessage('Meal name is required')
    .isIn(['Breakfast', 'Lunch', 'Dinner', 'Snack']).withMessage('Invalid meal type'),
  
  body('date')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  
  body('foods')
    .isArray().withMessage('Foods must be an array')
    .notEmpty().withMessage('At least one food item is required'),
  
  body('foods.*.food')
    .notEmpty().withMessage('Food ID is required')
    .isMongoId().withMessage('Invalid food ID'),
  
  body('foods.*.quantity')
    .notEmpty().withMessage('Quantity is required')
    .isFloat({ min: 0 }).withMessage('Quantity must be a positive number'),
  
  body('foods.*.servingSize')
    .notEmpty().withMessage('Serving size is required')
    .isFloat({ min: 0 }).withMessage('Serving size must be a positive number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateUpdateMeal = [
  body('name')
    .optional()
    .trim()
    .isIn(['Breakfast', 'Lunch', 'Dinner', 'Snack']).withMessage('Invalid meal type'),
  
  body('date')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  
  body('foods')
    .optional()
    .isArray().withMessage('Foods must be an array'),
  
  body('foods.*.food')
    .optional()
    .isMongoId().withMessage('Invalid food ID'),
  
  body('foods.*.quantity')
    .optional()
    .isFloat({ min: 0 }).withMessage('Quantity must be a positive number'),
  
  body('foods.*.servingSize')
    .optional()
    .isFloat({ min: 0 }).withMessage('Serving size must be a positive number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]; 