import { sessionsCollection, usersCollection } from "../database.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";

export async function signup(req, res) {
  try {
    const body = req.body;
    const hashPassword = bcrypt.hashSync(body.password, 10);
    await usersCollection.insertOne({ ...body, password: hashPassword });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.send({
      message: "Errou ao cadastrar",
      exception: error,
      success: false,
    });
  }
}

export async function signin(req, res) {
  try {
    const body = req.body;

    const user = await usersCollection.findOne({ email: body.email });

    const isValid = bcrypt.compareSync(body.password, user.password);

    if (!isValid) return res.sendStatus(401);

    const token = v4();

    await sessionsCollection.insertOne({ token, user: user._id });

    delete user.password;

    res.send({ token, ...user });
  } catch (error) {
    console.log(error);
    res.send({
      message: "Errou ao logar",
      exception: error,
      success: false,
    });
  }
}
