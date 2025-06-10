import { body, validationResult } from 'express-validator';

export const validateCreateFood = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('calories')
    .notEmpty().withMessage('Calories is required')
    .isFloat({ min: 0 }).withMessage('Calories must be a positive number'),
  
  body('protein')
    .notEmpty().withMessage('Protein is required')
    .isFloat({ min: 0 }).withMessage('Protein must be a positive number'),
  
  body('carbs')
    .notEmpty().withMessage('Carbs is required')
    .isFloat({ min: 0 }).withMessage('Carbs must be a positive number'),
  
  body('fats')
    .notEmpty().withMessage('Fats is required')
    .isFloat({ min: 0 }).withMessage('Fats must be a positive number'),
  
  body('servingSize')
    .notEmpty().withMessage('Serving size is required')
    .isFloat({ min: 0 }).withMessage('Serving size must be a positive number'),
  
  body('servingUnit')
    .trim()
    .notEmpty().withMessage('Serving unit is required'),
  
  body('brand')
    .optional()
    .trim(),
  
  body('barcode')
    .optional()
    .trim(),
  
  body('isCustom')
    .optional()
    .isBoolean().withMessage('isCustom must be a boolean'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateUpdateFood = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('calories')
    .optional()
    .isFloat({ min: 0 }).withMessage('Calories must be a positive number'),
  
  body('protein')
    .optional()
    .isFloat({ min: 0 }).withMessage('Protein must be a positive number'),
  
  body('carbs')
    .optional()
    .isFloat({ min: 0 }).withMessage('Carbs must be a positive number'),
  
  body('fats')
    .optional()
    .isFloat({ min: 0 }).withMessage('Fats must be a positive number'),
  
  body('servingSize')
    .optional()
    .isFloat({ min: 0 }).withMessage('Serving size must be a positive number'),
  
  body('servingUnit')
    .optional()
    .trim(),
  
  body('brand')
    .optional()
    .trim(),
  
  body('barcode')
    .optional()
    .trim(),
  
  body('isCustom')
    .optional()
    .isBoolean().withMessage('isCustom must be a boolean'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]; 