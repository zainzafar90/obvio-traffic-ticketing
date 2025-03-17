import { VehicleInfoResponse } from "@/types/api/api-responses";

import { getRequest } from "./common";

async function getVehicleInfo(licensePlate: string) {
  return getRequest<VehicleInfoResponse>("/v1/dmv/vehicle-info", {
    licensePlate,
  });
}

export const dmv = {
  getVehicleInfo: getVehicleInfo,
};
