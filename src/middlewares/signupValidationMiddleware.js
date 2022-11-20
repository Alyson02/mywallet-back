import { userSchema } from "../models/userSchema.js";

export function signupValidation(req, res, next) {
  const body = req.body;
  const { error } = userSchema.validate(body, { abortEarly: false });

  console.log(body, error);
  if (error) {
    const errors = error.details.map((x) => x.message);
    return res.status(422).send({ erros: errors });
  }

  next();
}
