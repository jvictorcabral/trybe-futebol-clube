import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const SECRET: string = process.env.JWT_SECRET || 'jwt_secret';
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    verify(auth, SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};

export default validateToken;
