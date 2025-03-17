import express, { Router } from "express";

import { config } from "@/config/config";

import authRoute from "./auth.routes";
import docsRoute from "./swagger.routes";
import eventRoute from "./event.routes";
import dmvRoute from "./dmv.routes";

const router: express.Router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: "/account",
    route: authRoute,
  },
  {
    path: "/events",
    route: eventRoute,
  },
  {
    path: "/dmv",
    route: dmvRoute,
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
