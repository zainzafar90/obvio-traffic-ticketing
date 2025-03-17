import express, { Router } from "express";

import { validate } from "@/common/validate";
import { auth } from "@/modules/auth";
import { accountController } from "@/modules/auth/auth.controller";
import { accountValidation } from "@/modules/auth/auth.validation";

const router: Router = express.Router();

router.post(
  "/register",
  validate(accountValidation.register),
  accountController.register
);

router.post(
  "/login",
  validate(accountValidation.login),
  accountController.login
);

router.post("/logout", auth(), accountController.logout);

router.post(
  "/forgot-password",
  validate(accountValidation.forgotPassword),
  accountController.forgotPassword
);

router.post(
  "/reset-password",
  validate(accountValidation.resetPassword),
  accountController.resetPassword
);

router.get("/", auth(), accountController.getAccount);

router.put(
  "/",
  auth(),
  validate(accountValidation.updateAccountBody),
  accountController.updateAccount
);

export default router;
