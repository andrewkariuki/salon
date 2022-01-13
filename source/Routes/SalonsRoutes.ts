import { CommonRoutesConfig } from "../Common";
import { Application, NextFunction, Request, Response } from "express";
import { SalonController, UserController } from "../controllers";

export class SalonsRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "SalonsRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/salons`)
      .get(async (req: Request, res: Response, next: NextFunction) => {
        let user;

        if (req.session.user)
          user = await new UserController().one(req, res, next);

        const salons = await new SalonController().all(req, res, next);

        res.render("salons", {
          title: "Salons | Ready when your are",
          user: user,
          salons: salons,
        });
      });

    this.app
      .route(`/salon/:id`)
      .get(async (req: Request, res: Response, next: NextFunction) => {
        let user;
        if (req.session.user)
          user = await new UserController().one(req, res, next);

        const salon = await new SalonController().one(req, res, next);
        if (salon) {
          res.render("salon", {
            title: `Book services at ${salon.name}`,
            salon: salon,
            user: user,
          });
        } else {
          res.redirect("/salons");
        }
      })
      .post(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.session.user) {
          res.redirect(`/salons`);
        } else {
          const salon = new SalonController().save(req, res, next);
          if (salon) {
            res.redirect(`/my-salons`);
          } else {
            res.redirect(`/my-salons`);
          }
        }
      });

    this.app
      .route(`/list-salon`)
      .get(async (req: Request, res: Response, next: NextFunction) => {
        if (req.session.user) {
          const user = await new UserController().one(req, res, next);
          res.render("list", {
            title: "Create your salon | Salon",
            user: user,
          });
        } else {
          res.redirect("/login");
        }
      })
      .post(async (req: Request, res: Response, next: NextFunction) => {
        if (req.session.user) {
          const salon = new SalonController().save(req, res, next);
          if (salon) {
            res.redirect(`/my-salons`);
          } else {
            res.redirect(`/list-salon`);
          }
        } else {
          res.redirect("/login");
        }
      });

    this.app
      .route(`/my-salons`)
      .get(async (req: Request, res: Response, next: NextFunction) => {
        if (req.session.user) {
          const user = await new UserController().one(req, res, next);

          const salons = await new SalonController().my(req, res, next);

          res.render("my-salons", {
            title: "All your salons | Salon",
            user: user,
            salons: salons,
          });
        } else {
          res.redirect("/login");
        }
      });

    return this.app;
  }
}
