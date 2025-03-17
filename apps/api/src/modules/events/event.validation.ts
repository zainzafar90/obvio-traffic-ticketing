import { uuid } from "@/common/validate/custom.validation";
import { EventStatus, RejectionReason } from "@/types/enums.types";
import Joi from "joi";

export const eventValidation = {
  getRandomEvent: {
    query: Joi.object().keys({
      userId: Joi.string().custom(uuid),
    }),
  },

  updateEvent: {
    params: Joi.object().keys({
      eventId: Joi.string().custom(uuid),
    }),
    body: Joi.object().keys({
      status: Joi.string().valid(EventStatus.APPROVED, EventStatus.REJECTED),
      reason: Joi.string().valid(
        RejectionReason.FALSE_POSITIVE,
        RejectionReason.MAIN_CAMERA_ISSUE,
        RejectionReason.LICENSE_PLATE_ISSUE,
        RejectionReason.DMV_INFORMATION_ISSUE
      ),
    }),
  },
};
