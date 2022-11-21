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

export async function deleteMovement(req, res) {
  try {
    const movement = res.locals.movement;
    await financesCollection.deleteOne({ _id: movement._id });
    res.sendStatus(204);
  } catch (error) {
    res
      .send({
        message: "error delete movement",
        exception: error,
        success: false,
      })
      .status(500);
  }
}

export async function updateMovement(req, res) {
  try {
    const body = req.body;
    const movement = res.locals.movement;
    delete body.type;
    await financesCollection.updateOne(
      { _id: movement._id },
      { $set: { ...body, date: new Date() } }
    );
    res.sendStatus(204);
  } catch (error) {
    res.send({
      message: "error update movement",
      exception: error,
      success: false,
    });
  }
}

export async function getMovementById(req, res) {
  try {
    const movement = res.locals.movement;
    const movementGet = await financesCollection.findOne({
      _id: movement._id,
    });
    res.send(movementGet).status(200);
  } catch (error) {
    res.send({
      message: "error get movement",
      exception: error,
      success: false,
    });
  }
}
