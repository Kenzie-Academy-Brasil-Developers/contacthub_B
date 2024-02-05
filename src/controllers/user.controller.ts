import { NextFunction, Request, Response } from "express";
import { TUserReturn } from "../interfaces/user.interface";
import {
  createUserService,
  updateUserService,
  deleteUserService,
  readAllUsersService,
  readUserSpecificService,
} from "../services/user.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: TUserReturn = await createUserService(req.body);

  const formattedUser = {
    ...user,
    createdAt: user.createdAt.toString(),
  };
  return res.status(201).json(formattedUser);
};

export const readAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await readAllUsersService();

  return res.status(200).json(users);
};

export const readUserSpecificController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const UserId: number = Number(req.params.id);
  const user: TUserReturn = await readUserSpecificService(UserId);

  return res.status(200).json(user);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = res.locals;

  const userUp = await updateUserService(req.body, user);

  return res.status(200).json(userUp);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = res.locals;
  await deleteUserService(user);

  return res.status(204).json();
};
