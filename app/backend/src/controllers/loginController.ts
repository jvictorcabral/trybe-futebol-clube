import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/user';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const SECRET: string = process.env.JWT_SECRET || 'jwt_secret';

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const findPassword = bcrypt.compareSync(password, user.password);

  if (!findPassword) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = sign({ email, password }, SECRET);

  return res.status(200).json({ token });
};

export default {
  login,
};
