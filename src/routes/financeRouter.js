import { Router } from "express";
import {
  addMovement,
  deleteMovement,
  getHistory,
  getMovementById,
  updateMovement,
} from "../controllers/financeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { movementExistisValidation } from "../middlewares/movementExistisValidationMiddleware.js";
import { movementValidation } from "../middlewares/movementValidationMiddleware.js";
const financeRouter = Router();

financeRouter.post(
  "/addMovement",
  movementValidation,
  authMiddleware,
  addMovement
);

financeRouter.delete(
  "/deleteMovement/:movementId",
  movementExistisValidation,
  authMiddleware,
  deleteMovement
);

financeRouter.put(
  "/updateMovement/:movementId",
  movementValidation,
  movementExistisValidation,
  authMiddleware,
  updateMovement
);

financeRouter.get("/history", authMiddleware, getHistory);

financeRouter.get(
  "/movementById/:movementId",
  movementExistisValidation,
  authMiddleware,
  getMovementById
);

export default financeRouter;
