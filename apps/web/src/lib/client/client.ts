import { auth } from "./auth.requests";
import { dmv } from "./dmv.requests";
import { event } from "./event.requests";

export const client = {
  auth,
  event,
  dmv,
};
