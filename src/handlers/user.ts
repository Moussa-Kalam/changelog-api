import prisma from '../db';
import { Request, Response } from 'express';
import { comparePasswords, createJWT, hashPassword } from '../utils/auth';
import { User } from '@prisma/client';

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

export const signIn = async (req: Request, res: Response) => {
  const user = (await prisma.user.findUnique({
    where: { username: req.body.username },
  })) as User;

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res
      .status(401)
      .json({ status: 'error', message: 'Unable to authenticate' });
    return;
  }

  const token = createJWT(user);
  res.json({
    status: 'success',
    data: {
      token,
    },
  });
};
