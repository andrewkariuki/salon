import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { SalonController } from ".";
import { Booking } from "../entity/Booking";
import { UserController } from "./UserController";

export class BookingsController {
  private bookingRepository = getRepository(Booking);

  async book(req: Request, res: Response, next: NextFunction) {
    console.log(req.session.user);
    const user = await new UserController().one(req, res, next);

    console.log(user);

    const salon = await new SalonController().one(req, res, next);

    const booking = await this.bookingRepository.create({
      date: req.body.date,
    });

    booking.user = user;
    booking.salon = salon;

    return await this.bookingRepository.save(booking);
  }

  async my(req: Request, res: Response, next: NextFunction) {
    return await this.bookingRepository.find({
      relations: ["user", "salon"],
      where: { user: { id: req.session.user } },
    });
  }

  async appointments(req: Request, res: Response, next: NextFunction) {
    const salon = await new SalonController().my(req, res, next);

    // return await this.bookingRepository.find({
    //   relations: ["salon"],
    //   where: { salon: { id: salon.id } },
    // });
  }
}
