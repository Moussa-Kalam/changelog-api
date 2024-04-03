import prisma from '../db';
import { Request, Response } from 'express';
import { createJWT, hashPassword } from '../utils/auth';

export const createNewUser = async (req: Request, res: Response) => {
  const hashedPassword = await hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hashedPassword,
    },
  });

  const token = createJWT(user);

  res.json({
    status: 'success',
    data: {
      token,
    },
  });
};
