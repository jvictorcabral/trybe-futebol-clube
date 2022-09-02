import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');

const errorMessage = 'Some required fields are missing';

const VALIDATE = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.empty': errorMessage,
      'any.required': errorMessage,
      'string.email': 'Invalid fields',
    }),
  password: Joi.string().required()
    .messages({
      'string.empty': errorMessage,
      'any.required': errorMessage,
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
