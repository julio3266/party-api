import { NextFunction, Request, Response, response } from 'express';
import { verify } from 'jsonwebtoken';
import { prisma } from '../utils/Prisma';

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export const AuthMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Sorry, not authorized' });
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, process.env.SECRET_KEY || '');
    const { id } = decoded as TokenPayload;
    const useRole = await prisma.user.findUnique({ where: { id: id } });
    console.log(useRole);
    req.userId = id;
    next();
  } catch (error) {
    return response.status(401).json({ error: 'Not authorized' });
  }
};

export const AdminMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Sorry, not authorized' });
  }

  const [, token] = authorization.split(' ');
  try {
    const decoded = verify(token, process.env.SECRET_KEY || '');
    const { id } = decoded as TokenPayload;
    const userRole = await prisma.user.findUnique({ where: { id: id } });
    req.userId = id;
    if (userRole?.role === 'ADMIN') {
      next();
    } else {
      return res.status(401).json({ error: 'Acess is not granted' });
    }
  } catch (error) {
    return response.status(401).json({ error: 'Operation is empty' });
  }
};
