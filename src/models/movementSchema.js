import Joi from "joi";

export const movementSchema = Joi.object({
  value: Joi.number().required().greater(0.1),
  description: Joi.string().min(5).required(),
  type: Joi.string().valid("deposit", "exit").required(),
});
