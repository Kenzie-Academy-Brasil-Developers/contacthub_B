import { Router } from "express";
import { loginController } from "../controllers/login.controller";

export const loginRouter: Router = Router();
loginRouter.use("/login", loginRouter);
loginRouter.post("/", loginController);
