import { Request, Response } from "express";
import { prisma } from "../utils/Prisma";
import { hash } from "bcryptjs";

export class UserController {
  async list(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.json({ users });
  }

  async create(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    const passwordHash = await hash(password, 8);
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.status(404).json({ Message: "Sorry, user alrealy exists" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });
    return res.json({ user });
  }
}
