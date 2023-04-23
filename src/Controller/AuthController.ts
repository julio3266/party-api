import { Request, Response } from "express";
import { prisma } from "../utils/Prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthController {
  async auth(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ Message: "Sorry, email or password is incorrect" });
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(404)
        .json({ Message: "Sorry, email or password is incorrect" });
    }

    const token = sign(
      { id: user.id },
      process.env.SECRET_KEY ?? "FSMAFM2391MR21MDEFAULTSECRET",
      { expiresIn: "1d" }
    );

    return res.json({ user, token });
  }
}
