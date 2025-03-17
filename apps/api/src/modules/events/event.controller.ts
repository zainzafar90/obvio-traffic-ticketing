import { Request, Response } from "express";
import httpStatus from "http-status";

import { EventResponse } from "@/types/api/api-responses";
import { IUser } from "@/types/interfaces/resources";
import { catchAsync } from "@/utils/catch-async";
import { ApiError } from "@/common/errors/api-error";

import { permissionService } from "../permissions/permission.service";
import { eventService } from "./event.service";

export const eventController = {
  getRandomEvent: catchAsync(
    async (req: Request, res: Response<EventResponse>) => {
      const user = req.user as IUser;
      const isAllowed = permissionService.checkPermissions(
        user.role,
        "view",
        "events"
      );

      if (!isAllowed) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          "You do not have permission to view events"
        );
      }

      const randomEvent = await eventService.getRandomEvent();
      if (!randomEvent) {
        throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
      }
      res.send(randomEvent);
    }
  ),

  updateEvent: catchAsync(
    async (req: Request, res: Response<EventResponse>) => {
      const user = req.user as IUser;
      const isAllowed = permissionService.checkPermissions(
        user.role,
        "update",
        "events"
      );
      if (!isAllowed) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          "You do not have permission to update events"
        );
      }

      const updatedEvent = await eventService.updateEventById(
        req.params.eventId,
        user.id,
        req.body
      );
      res.send(updatedEvent);
    }
  ),
};
