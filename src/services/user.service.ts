import { hash } from "bcryptjs";
import User from "../entities/users.entity";
import {
  TUserCreate,
  TUserReturn,
  TUserUpdate,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories";
import { userReturnSchema } from "../schemas/user.schema";

export const createUserService = async (
  data: TUserCreate
): Promise<TUserReturn> => {
  const hashedPassword = await hash(data.password, 10);
  const user = userRepository.create({
    ...data,
    password: hashedPassword,
  });

  await userRepository.save(user);

  const parsedUser = userReturnSchema.parse(user);
  return parsedUser;
};

export const updateUserService = async (
  data: TUserUpdate,
  user: User
): Promise<TUserReturn> => {
  if (data.password) {
    const hashedPassword = await hash(data.password, 10);
    data.password = hashedPassword;
  }

  const updatedUser: User = userRepository.create({
    ...user,
    ...data,
  });

  await userRepository.save(updatedUser);
  return userReturnSchema.parse(updatedUser);
};

export const deleteUserService = async (user: User): Promise<void> => {
  await userRepository.delete(user);
};
