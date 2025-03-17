import express, { Router } from "express";

import { validate } from "@/common/validate";
import { auth } from "@/modules/auth";
import { eventController, eventValidation } from "@/modules/events";

const router: Router = express.Router();

router
  .route("/random")
  .get(
    auth(),
    validate(eventValidation.getRandomEvent),
    eventController.getRandomEvent
  );

router
  .route("/:eventId")
  .patch(
    auth(),
    validate(eventValidation.updateEvent),
    eventController.updateEvent
  );

export default router;
