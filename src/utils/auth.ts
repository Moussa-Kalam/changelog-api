import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

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
