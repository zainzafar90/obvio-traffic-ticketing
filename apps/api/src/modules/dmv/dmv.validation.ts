import Joi from "joi";

export const dmvValidation = {
  getVehicleInfo: {
    query: Joi.object().keys({
      licensePlate: Joi.string().required(),
    }),
  },
};
