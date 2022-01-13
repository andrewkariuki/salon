import { Application, NextFunction, Request, Response } from "express";
import { CommonRoutesConfig } from "../Common";
import { AuthController } from "../controllers";

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/login`)
      .get(async (req: Request, res: Response, next: NextFunction) => {
        req.session.user
          ? res.redirect("/")
          : res.render("login", { title: "Login | Salon", login: true });
      })
      .post(async (req: Request, res: Response, next: NextFunction) => {
        const result = await new AuthController().login(req, res, next);
        if (result !== null && result !== undefined) {
          res.redirect("/");
        } else {
          res.redirect("/login");
        }
      });

    this.app
      .route("/register")
      .get(async (req: Request, res: Response, next: NextFunction) => {
        req.session.user
          ? res.redirect("/")
          : res.render("register", { title: "Register | Salon" });
      })
      .post(async (req: Request, res: Response, next: NextFunction) => {
        const result = await new AuthController().register(req, res, next);

        result !== null && result !== undefined
          ? res.redirect("/login")
          : res.redirect("/register");
      });

    this.app
      .route("/logout")
      .get(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.session.user) {
          res.redirect("/login");
        } else {
          req.session.destroy((err) => {
            console.log(err);
          });
          res.redirect("/");
        }
      });

    return this.app;
  }
}
