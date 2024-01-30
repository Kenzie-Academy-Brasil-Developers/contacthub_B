import { Router } from "express";
import {
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller";
import {
  checkingBody,
  checkingToken,
} from "../middlewares/globals.middlewares";
import {
  checkingUserEmail,
  checkingUserExists,
  checkingUserPhone,
} from "../middlewares/user.middleware";
import { createUserSchema, userUpdateSchema } from "../schemas/user.schema";

export const userRouter: Router = Router();

userRouter.post(
  "/",
  checkingBody(createUserSchema),
  checkingUserEmail,
  checkingUserPhone,
  createUserController
);

userRouter.patch(
  "/:id",
  checkingBody(userUpdateSchema),
  checkingToken,
  checkingUserExists,
  checkingUserEmail,
  checkingUserPhone,
  updateUserController
);
userRouter.delete(
  "/:id",
  checkingToken,
  checkingUserExists,
  deleteUserController
);
