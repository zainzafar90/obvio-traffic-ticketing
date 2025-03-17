import {
  IAccessAndRefreshTokens,
  IEvent,
  IUser,
  IVehicleInfo,
} from "../interfaces/resources";
import { ResourceResponse } from "./api-operations";

// Auth
export type AuthResponse = ResourceResponse<IAccessAndRefreshTokens>;
export type UserAuthResponse = ResourceResponse<
  { tokens: IAccessAndRefreshTokens } & { user: IUser }
>;

// Profile
export type UserProfileResponse = ResourceResponse<IUser>;

// Events
export type EventResponse = ResourceResponse<IEvent>;

// DMV
export type VehicleInfoResponse = ResourceResponse<IVehicleInfo>;
