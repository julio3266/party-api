import { Request, Response } from "express";
import { prisma } from "../utils/Prisma";

export class GuestController {
  async list(req: Request, res: Response) {
    const guests = await prisma.guest.findMany();
    return res.json({ guests });
  }

  async create(req: Request, res: Response) {
    const { firstName, lastName, email, address, phoneNumbr } = req.body;
    const guest = await prisma.guest.create({
      data: {
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
      },
    });
    return res.status(201).json({ guest });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { firstName, lastName, email, address, phoneNumber } = req.body;
    const newGuest = await prisma.guest.update({
      where: { id: id },
      data: { firstName, lastName, email, address, phoneNumber },
    });
    return res.status(201).json({ newGuest });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await prisma.guest.delete({
      where: { id: id },
    });

    return res.status(204).json({ Message: "Guest removed successfull" });
  }
}
