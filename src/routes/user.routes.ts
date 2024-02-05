import { Router } from "express";
import {
  createUserController,
  updateUserController,
  deleteUserController,
  readAllUsersController,
  readUserSpecificController,
} from "../controllers/user.controller";
import {
  checkingAdmin,
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
userRouter.use("/users", userRouter);

userRouter.post(
  "/users",
  checkingBody(createUserSchema),
  checkingUserEmail,
  checkingUserPhone,
  createUserController
);

userRouter.get(
  "/all/users",
  checkingToken,
  checkingAdmin,
  readAllUsersController
);

userRouter.get(
  "/:id",
  checkingToken,
  checkingAdmin,
  readUserSpecificController
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
  checkingAdmin,
  checkingUserExists,
  deleteUserController
);
