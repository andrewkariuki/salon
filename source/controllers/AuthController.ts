import * as bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export class AuthController {
  private userRepository = getRepository(User);

  async register(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const userAlreadyExists = await this.userRepository.findOne({
      where: { email },
      select: ["id"],
    });

    if (userAlreadyExists) return null;

    return this.userRepository.save(
      this.userRepository.create({ ...req.body })
    );
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await this.userRepository.findOne({
      where: { email },
      select: ["id", "password"],
    });

    if (!user) return null;

    const isUser = await bcrypt.compare(password, user.password);

    if (!isUser) return null;

    req.session.user = user.id;

    return true;
  }
}
