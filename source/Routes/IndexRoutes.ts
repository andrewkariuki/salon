import { CommonRoutesConfig } from "../Common";
import { Application, NextFunction, Request, Response } from "express";
import { UserController } from "../controllers";
import { isAuthenticated } from "../Middleware";

export class IndexRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "IndexRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/`)
      .get(async (req: Request, res: Response, next: NextFunction) => {
        let user;

        if (req.session.user)
          user = await new UserController().one(req, res, next);

        res.render("index", {
          title: "Salon | Find your favorite beauty parlor",
          user: user,
        });
      });

    return this.app;
  }
}
