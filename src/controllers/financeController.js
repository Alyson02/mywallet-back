import dayjs from "dayjs";
import { financesCollection } from "../database.js";

export async function addMovement(req, res) {
  try {
    const body = req.body;
    const user = res.locals.user;
    const now = new Date();

    await financesCollection.insertOne({ ...body, user: user._id, date: now });

    res.sendStatus(201);
  } catch (error) {
    res.send({
      message: "error creating movement",
      exception: error,
      success: false,
    });
  }
}

export async function getHistory(req, res) {
  try {
    const user = res.locals.user;
    const history = await financesCollection.find({ user: user._id }).toArray();
    res.send(history);
  } catch (error) {
    res.send({
      message: "error creating movement",
      exception: error,
      success: false,
    });
  }
}
