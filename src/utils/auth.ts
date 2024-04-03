import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

type AuthenticatedRequest = Request & { user?: User };

export const createJWT = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET as string
  );

  return token;
};

export const protect = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({
      status: 'error',
      message: 'Not authorized',
    });
    return;
  }

  const [, token] = bearer.split(' ');
  if (!token) {
    res.status(401).json({
      status: 'error',
      message: 'Not authorized',
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = payload as User;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid token',
    });
    return;
  }
};
