import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');

const errorMessage = 'Incorrect email or password';
const errorEmptyMessage = 'All fields must be filled';

const VALIDATE = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.empty': errorEmptyMessage,
      'any.required': errorEmptyMessage,
      'string.email': errorMessage,
    }),
  password: Joi.string().required()
    .messages({
      'string.empty': errorEmptyMessage,
      'any.required': errorEmptyMessage,
    }),
});

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { error } = VALIDATE.validate({ email, password });

  if (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }

  next();
};

export default validateLogin;
