import { loginSchema } from "../models/loginSchema.js";

export function signinValidation(req, res, next) {
  const body = req.body;
  const { error } = loginSchema.validate(body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((x) => x.message);
    return res.status(422).send({ erros: errors });
  }

  next();
}
