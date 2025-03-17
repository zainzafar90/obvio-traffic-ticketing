import { Request, Response } from "express";
import httpStatus from "http-status";

import { Provider } from "@/types/enums.types";
import { IUser } from "@/types/interfaces/resources";
import { catchAsync } from "@/utils/catch-async";

import { cookieService } from "../cookies";
import { emailService } from "../email";
import { userService } from "../user";
import { verificationTokenService } from "../verification-token";
import { accountService } from "./auth.service";

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.registerUser(req.body);
  const tokens = await accountService.generateAuthTokens(user as IUser);
  await accountService.updateAccountTokens(user.id, Provider.PASSWORD, tokens);
  cookieService.setResponseCookie(res, tokens);
  res.status(httpStatus.CREATED).send({ user });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await accountService.loginUserWithEmailAndPassword(
    email,
    password
  );
  const tokens = await accountService.generateAuthTokens(user);
  await accountService.updateAccountTokens(user.id, Provider.PASSWORD, tokens);
  cookieService.setResponseCookie(res, tokens);
  res.status(httpStatus.OK).send({
    ...tokens,
  });
});

export const forgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    const resetPasswordToken =
      await verificationTokenService.generateResetPasswordToken(req.body.email);
    await emailService.sendResetPasswordEmail(
      req.body.email,
      resetPasswordToken
    );
    res.status(httpStatus.OK).send({
      success: true,
    });
  }
);

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await accountService.resetPassword(
    req.query["token"] as string,
    req.body.password
  );
  res.status(httpStatus.OK).send({
    success: true,
  });
});

const logout = catchAsync(async (_req: Request, res: Response) => {
  cookieService.clearJwtCookie(res);
  res.status(httpStatus.NO_CONTENT).send();
});

const getAccount = catchAsync(async (req: Request, res: Response) => {
  const apiToken = cookieService.getAuthCookieToken(req);

  const account = await accountService.getUserAccount(apiToken);
  if (!account) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: "User not found",
    });
  }

  return res.send({
    ...account.user,
  });
});

const updateAccount = catchAsync(async (req: Request, res: Response) => {
  const apiToken = cookieService.getAuthCookieToken(req);

  const account = await accountService.updateUserAccount(apiToken, req.body);
  if (!account) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: "User not found",
    });
  }

  return res.send({
    ...account.user,
  });
});

export const accountController = {
  getAccount,
  updateAccount,
  logout,
  register,
  login,
  forgotPassword,
  resetPassword,
};
