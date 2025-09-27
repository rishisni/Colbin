// backend/src/user/user.controller.js
const userService = require('./user.service');
const Joi = require('joi');

// Define and export schemas for reusability within this file
const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'))
    .required()
    .messages({
      'string.pattern.base': 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .required(),
});

// The following is an example of a validation schema for updating a profile, 
// though not required by the current assignment.
const profileUpdateSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
});


exports.register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password, firstName, lastName } = req.body;
  

  try {
    await userService.registerUser({ email, password, firstName, lastName });
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    if (err.message.includes('exists')) {
      return res.status(409).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const { token } = await userService.loginUser(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    if (err.message.includes('Invalid credentials')) {
      return res.status(401).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

exports.getProfile = async (req, res) => {
  // No body validation is needed for getProfile as it relies on the auth middleware
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    if (err.message.includes('not found')) {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};