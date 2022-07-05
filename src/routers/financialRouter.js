import { Router } from "express";

import { financialController } from "../controllers/financialController.js";
import { validateToken } from "../middlewares/authMiddleware.js";

export const financialRouter = Router();

financialRouter.post("/financial-events", validateToken, financialController.sendFinancialEvent);

financialRouter.get("/financial-events", financialController.getFinancialEvents);

financialRouter.get("/financial-events/sum", financialController.getFinancialEventsSum);