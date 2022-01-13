import "reflect-metadata";
require("dotenv-safe").config();
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import debug from "debug";
import * as express from "express";
import * as session from "express-session";
import * as expressWinston from "express-winston";
import * as http from "http";
import * as sassMiddleware from "node-sass-middleware";

import * as path from "path";
import * as winston from "winston";
import { CommonRoutesConfig } from "./Common";
import {
  AuthRoutes,
  BookingsRoutes,
  IndexRoutes,
  SalonsRoutes,
  UsersRoutes,
} from "./Routes";
import { connectDb } from "./Services";

connectDb().then(() => console.log("Database connected"));

const app: express.Application = express();
const server: http.Server = http.createServer(app);

const port = 3000;

const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
  session({
    name: "sess",
    secret: "r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

app.use(cors());

app.use(
  sassMiddleware({
    src: path.join(__dirname, "../public"),
    dest: path.join(__dirname, "../public"),
    indentedSyntax: true,
    sourceMap: true,
    outputStyle: "compressed",
  })
);

app.use(express.static(path.join(__dirname, "../public")));

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new UsersRoutes(app));
routes.push(new IndexRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new SalonsRoutes(app));
routes.push(new BookingsRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;

server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  console.log(runningMessage);
});
