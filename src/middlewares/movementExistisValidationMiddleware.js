import { ObjectId } from "mongodb";
import { financesCollection } from "../database.js";

export async function movementExistisValidation(req, res, next) {
  try {
    const { movementId } = req.params;

    console.log(movementId);

    const movement = await financesCollection.findOne({
      _id: ObjectId(movementId),
    });

    if (!movement) return res.sendStatus(404);

    res.locals.movement = movement;
    next();
  } catch (error) {
    console.log(error);
    res
      .send({
        message: "error find movement",
        exception: error,
        success: false,
      })
      .status(500);
  }
}
