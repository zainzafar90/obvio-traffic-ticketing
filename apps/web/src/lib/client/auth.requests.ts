import { EmailPassReq } from "@/types/api/api-payloads";
import { AuthResponse, UserProfileResponse } from "@/types/api/api-responses";

import { getRequest, postRequest } from "./common";

async function register(payload: EmailPassReq) {
  return postRequest<AuthResponse>("/v1/account/register", payload);
}

async function login(payload: EmailPassReq) {
  return postRequest<AuthResponse>("/v1/account/login", payload);
}

async function logout() {
  return postRequest<void>("/v1/account/logout");
}

async function me() {
  return getRequest<UserProfileResponse>("/v1/account");
}

export const auth = {
  me,
  register,
  login,
  logout,
};
