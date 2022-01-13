import { CommonRoutesConfig } from "../Common";
import { Request, Response, NextFunction, Application } from "express";
import { UserController } from "../controllers";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/account/:id`)
      .get(async (req: Request, res: Response, next: NextFunction) => {
        const user = await new UserController().one(req, res, next);

        res.render("account", {
          title: `${user.firstName} ${user.lastName}'s Account`,
          user: user,
        });
      })
      .post(async (req: Request, res: Response, next: NextFunction) => {
        res.render("index", { title: "Express" });
      });
    return this.app;
  }
}
