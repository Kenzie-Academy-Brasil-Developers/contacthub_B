import { Router } from "express";
import { userRouter } from "./user.routes";
import { loginRouter } from "./login.routes";
import { contactRouter } from "./contact.routes";

export const routes: Router = Router();

routes.use("/users", userRouter);
routes.use("/login", loginRouter);
routes.use("/contact", contactRouter)