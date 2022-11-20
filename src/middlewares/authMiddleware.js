import { ObjectID } from "bson";
import { sessionsCollection, usersCollection } from "../database.js";

export async function authMiddleware(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.sendStatus(401);
    const token = authorization.replace("Bearer", "").trim();

    const session = await sessionsCollection.findOne({ token });
    if (!session) return res.sendStatus(401);

    const user = await usersCollection.findOne({ _id: session.user });
    delete user.password;
    res.locals.user = user;

    next();
  } catch (error) {
    res.send("erro ao autenticar").status(500);
  }
}
