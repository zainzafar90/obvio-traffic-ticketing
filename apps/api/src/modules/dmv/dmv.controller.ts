import { Request, Response } from "express";
import httpStatus from "http-status";

import { VehicleInfoResponse } from "@/types/api/api-responses";
import { IUser } from "@/types/interfaces/resources";
import { catchAsync } from "@/utils/catch-async";
import { ApiError } from "@/common/errors/api-error";

import { permissionService } from "../permissions/permission.service";
import { dmvService } from "./dmv.service";

export const dmvController = {
  getVehicleInfo: catchAsync(
    async (req: Request, res: Response<VehicleInfoResponse>) => {
      const user = req.user as IUser;
      const isAllowed = permissionService.checkPermissions(
        user.role,
        "view",
        "dmv"
      );

      if (!isAllowed) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          "You do not have permission to view DMV information"
        );
      }

      const vehicleInfo = await dmvService.getVehicleInfo(
        req.query.licensePlate as string
      );
      if (!vehicleInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, "Vehicle info not found");
      }
      res.send(vehicleInfo);
    }
  ),
};
