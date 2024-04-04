import { Response } from 'express';
import prisma from '../db';
import { AuthenticatedRequest } from '../utils/auth';

export const getProducts = async (req: AuthenticatedRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user?.id,
    },
    include: {
      products: true,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      products: user?.products,
    },
  });
};

export const getOneProduct = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const id = req.params.id;
  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user?.id,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
};


export