import Joi from "joi";

import { RegisterUserReq } from "@/types/api/api-payloads";
import { password } from "@/common/validate/custom.validation";

const registerBody: Record<keyof RegisterUserReq, any> = {
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  name: Joi.string().required(),
  image: Joi.string().optional(),
};

const updateAccountBody = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const register = {
  body: Joi.object().keys(registerBody),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

export const accountValidation = {
  register,
  login,
  forgotPassword,
  resetPassword,
  updateAccountBody,
};
