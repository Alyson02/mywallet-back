import { Router } from "express";
import { addMovement, getHistory } from "../controllers/financeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { movementValidation } from "../middlewares/movementValidationMiddleware.js";
const financeRouter = Router();

financeRouter.post(
  "/addMovement",
  movementValidation,
  authMiddleware,
  addMovement
);

financeRouter.get("/history", authMiddleware, getHistory);

export default financeRouter;
