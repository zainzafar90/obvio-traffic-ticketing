import express, { Router } from "express";

import { validate } from "@/common/validate";
import { auth } from "@/modules/auth";
import { dmvController, dmvValidation } from "@/modules/dmv";

const router: Router = express.Router();

router
  .route("/vehicle-info")
  .get(
    auth(),
    validate(dmvValidation.getVehicleInfo),
    dmvController.getVehicleInfo
  );

export default router;
