import {
  EventStatus,
  RejectionReason,
  RoleType,
  ViolationSeverity,
} from "@/types/enums.types";

export interface IAccessAndRefreshTokens {
  access: {
    token: string;
    expires: Date;
  };
  refresh: {
    token: string;
    expires: Date;
  };
}

export interface IUser {
  id?: string;
  name: string;
  email?: string;
  password?: string;
  isEmailVerified: boolean;
  role: RoleType;
  image?: string;
}

export interface IEvent {
  id: string;
  videoUrl: string;
  licensePlateImageUrl: string;
  status: EventStatus;
  violationSeverity: ViolationSeverity;
  reason: RejectionReason;
}

export interface IVehicleInfo {
  make: string;
  model: string;
  year: number;
  color: string;
}
