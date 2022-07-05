import { Router } from "express";
import { authController } from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post("/sign-up", authController.signup);

authRouter.post("/sign-in", authController.signin);
