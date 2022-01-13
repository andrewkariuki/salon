import { CommonRoutesConfig } from "../Common";
import { Application, NextFunction, Request, Response } from "express";
import { BookingsController, UserController } from "../controllers";
import { isAuthenticated } from "../Middleware";

export class BookingsRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "BookingsRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/appointments`)
      .get(async (req: Request, res: Response, next: NextFunction) => {
        if (req.session.user) {
          const user = await new UserController().one(req, res, next);

          res.render("appointments", {
            title: "Your appointments | Find your next customers",
            user: user,
          });
        } else {
          res.redirect("/login");
        }
      })
      .post(async (req: Request, res: Response, next: NextFunction) => {
        res.render("dashboard", { title: "Your Bookings | Salon" });
      });

    this.app
      .route(`/bookings`)
      .get(async (req: Request, res: Response, next: NextFunction) => {
        if (req.session.user) {
          const user = await new UserController().one(req, res, next);
          const bookings = await new BookingsController().my(req, res, next);

          res.render("bookings", {
            title: "Your Bookings | Salon",
            user: user,
            bookings: bookings,
          });
        } else {
          res.redirect("/login");
        }
      })
      .post(async (req: Request, res: Response, next: NextFunction) => {
        res.render("dashboard", { title: "Your Bookings | Salon" });
      });

    this.app
      .route(`/book/:id`)
      .post(async (req: Request, res: Response, next: NextFunction) => {
        if (req.session.user) {
          await new BookingsController().book(req, res, next);
          res.redirect("/bookings");
        } else {
          res.redirect("/login");
        }
      });

    return this.app;
  }
}
