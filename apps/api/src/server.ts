import { json, urlencoded } from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import httpStatus from "http-status";
import morgan from "morgan";
import passport from "passport";

import { config } from "@/config/config";
import routes from "@/routes/v1";
import { ApiError, errorConverter, errorHandler } from "@/common/errors";
import { jwtStrategy } from "@/modules/auth";
import { authLimiter } from "@/utils";

export type RequestWithRawBody = express.Request & { rawBody: Buffer };

export const createServer = (): Express => {
  const app = express();

  const corsOptions = {
    // TODO: Change to production domain when we have a production domain
    origin: true,

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["set-cookie"],
  };

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(
      json({
        verify: (req, _, buf) => {
          (req as RequestWithRawBody).rawBody = buf;
        },
      })
    )
    .use(
      helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
      })
    )
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(compression() as any)
    .use(cors(corsOptions))
    .options("*", cors(corsOptions))
    .use(cookieParser())
    .use(passport.initialize() as any)
    .use("/v1", routes)
    .get("/", (_, res) => {
      res.status(200).json({ message: "Obvio API v1.0.0" });
    })
    .get("/health", (_, res) => {
      res.status(200).json({ status: "ok" });
    })
    .use((req, res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
    })
    .use(errorConverter)
    .use(errorHandler);

  passport.use("jwt", jwtStrategy);

  if (config.env === "production") {
    app.use("/v1/auth", authLimiter as any);
  }

  return app;
};
