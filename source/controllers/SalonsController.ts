import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { UserController } from "./UserController";
import { Salon } from "../entity/Salon";

export class SalonController {
  private salonRepository = getRepository(Salon);

  async all(req: Request, res: Response, next: NextFunction) {
    return this.salonRepository.find();
  }

  async one(req: Request, res: Response, next: NextFunction) {
    return this.salonRepository.findOne(req.params.id);
  }

  async my(req: Request, res: Response, next: NextFunction) {
    return await this.salonRepository.find({
      relations: ["user"],
      where: { user: { id: req.session.user } },
    });
  }

  async save(req: Request, res: Response, next: NextFunction) {
    const { name, category, description, picture, city, slots, price } =
      req.body;

    const user = await new UserController().one(req, res, next);

    if (user) {
      const salon = await this.salonRepository.create({
        name: name,
        description: description,
        category: category,
        slots: slots,
        city: city,
        availability: slots,
        price: price,
      });

      salon.user = user;

      return await this.salonRepository.save(salon);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    let userToRemove = await this.salonRepository.findOne(req.session.user);
    await this.salonRepository.remove(userToRemove);
  }
}
