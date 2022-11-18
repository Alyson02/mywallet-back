import Joi from "joi";

export const userSchema = Joi.object({
    value: Joi.number().required().greater(0.1),
    description: Joi.string().min(5).required(),
});