import { Response, Request } from "express";

import { config } from "@/config/config";
import { IAccessAndRefreshTokens } from "@/types/interfaces/resources";
import { COOKIE_API_TOKEN } from "../auth/providers/passport";

export const cookieService = {
  setResponseCookie: async (
    res: Response,
    tokens: IAccessAndRefreshTokens
  ): Promise<void> => {
    const cookieOptions = {
      // TODO: Change to false for local development when lax is implemented
      secure: config.env === "production" || true,
      // TODO: Change to lax when we have a production domain
      sameSite: "none" as const,
      expires: tokens.access.expires,
      httpOnly: true,
      path: "/",
    };

    res.cookie(COOKIE_API_TOKEN, tokens.access.token, cookieOptions);
  },

  clearJwtCookie: (response: Response) => {
    const cookieOptions = {
      // TODO: Change to false for local development when lax is implemented
      secure: config.env === "production" || true,
      // TODO: Change to lax when we have a production domain
      sameSite: "none" as const,
      httpOnly: true,
      path: "/",
    };

    response.clearCookie(COOKIE_API_TOKEN, cookieOptions);
  },

  getAuthCookieToken: (request: Request) => {
    const apiToken = request.cookies[COOKIE_API_TOKEN];
    return apiToken;
  },
};
