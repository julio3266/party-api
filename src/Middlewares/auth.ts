import { NextFunction, Request, Response, response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export const AuthMiddlewares = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Sorry, not authorized" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = verify(token, process.env.SECRET_KEY || "");
    const { id } = decoded as TokenPayload;
    req.userId = id;
    next();
  } catch (error) {
    return response.status(401).json({ error: "Not authorized" });
  }
};
