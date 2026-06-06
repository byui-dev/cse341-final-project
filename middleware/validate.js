const Joi = require("joi");

// Define validation rules for users, items, and MongoDB IDs
const schemas = {
  // Rule for creating/updating a user
  userBody: Joi.object({
    googleId: Joi.string().optional(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(0).required(),
    phone: Joi.string().optional().allow(""),
    address: Joi.string().optional().allow(""),
  }),

  // Rule for creating/updating an item
  itemBody: Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
    brand: Joi.string().optional().allow(""),
    rating: Joi.number().min(0).max(5).optional(),
  }),

  // Rule to ensure request parameter IDs are valid 24-character hex strings
  paramsId: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

// Express Validation Middleware Factory
const validateRequest = (schemaName, source = "body") => {
  return (req, res, next) => {
    // Determine if we are validating req.body or req.params
    const dataToValidate = source === "params" ? req.params : req.body;

    // Validate and catch the cleaned, stripped value object
    const { error, value } = schemas[schemaName].validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true, // Strips 'createdAt' before it reaches controllers
    });

    if (error) {
      // Gather all error messages into an array
      const errorMessages = error.details.map((detail) => detail.message);
      res.status(400);
      return next(new Error(`Validation Failed: ${errorMessages.join(", ")}`));
    }

    // Overwrite with clean fields so database operations don't see invalid fields
    if (source === "params") {
      req.params = value;
    } else {
      req.body = value;
    }

    next();
  };
};

module.exports = { validateRequest };
