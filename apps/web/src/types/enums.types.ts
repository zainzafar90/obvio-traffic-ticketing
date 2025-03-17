export enum RoleType {
  User = "user",
}

export enum ViolationSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum EventStatus {
  IDLE = "idle",
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum RejectionReason {
  FALSE_POSITIVE = "falsePositive",
  MAIN_CAMERA_ISSUE = "mainCameraIssue",
  LICENSE_PLATE_ISSUE = "licensePlateIssue",
  DMV_INFORMATION_ISSUE = "dmvInformationIssue",
}
