const Joi = require('joi');

const validateUser = (req, res, next) => {
    const { firstName, lastName, email, age, phone, address } = req.body;
    
    // Required fields validation
    if (!firstName || !lastName || !email ) {
        return res.status(400).json({ message: 'firstName, lastName, and email are required' });
    }

    // Data type checks
    if (typeof firstName !== 'string' || typeof lastName !== 'string') { 
        return res.status(400).json({ message: 'firstName and lastName must be strings' });
    }

    // Email format check
    
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: 'Invalid email format'
        });
    }

    // Age validation
    if (age && (typeof age !== 'number' || age < 0)) {
        return res.status(400).json({ message: 'Age must be a positive number' });
    }

    // Address validation
    if (address && typeof address !== 'string')
    {
        return res.status(400).json({ message: 'Address must be a string' });
    }

    // Phone number validation (simple regex for demonstration)
    if (phone) {
        if (typeof phone !== 'string') {
            return res.status(400).json({ message: 'Phone number must be a string' });
        }

        const phoneRegex = /^[0-9]+$/;

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: 'Invalid phone number format' });
        }
    }

    next();
};

const schemas = {
  userBody: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().min(0),
    phone: Joi.string().pattern(/^[0-9]+$/),
    address: Joi.string()
  }),
  itemBody: Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),
    description: Joi.string().trim().max(500),
    price: Joi.number().positive().precision(2).required(),
    category: Joi.string().valid('electronics', 'books', 'clothing', 'home', 'other').required(),
    stock: Joi.number().integer().min(0).required()
  }),
  paramsId: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
};

const validateRequest = (schemaKey, property = 'body') => {
  return (req, res, next) => {
    const { error } = schemas[schemaKey].validate(req[property], { abortEarly: false });
    if (error) {
      const errorDetails = error.details.map(detail => detail.message);
      return res.status(400).json({ message: 'Validation error', details: errorDetails });
    }

    next();
  };
};

module.exports = {
  validateUser,
  validateRequest
};