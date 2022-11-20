import { movementSchema } from "../models/movementSchema.js";

export function movementValidation(req, res, next) {
  const body = req.body;
  const { error } = movementSchema.validate(body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((x) => x.message);
    return res.status(422).send({ erros: errors });
  }

  next();
}
