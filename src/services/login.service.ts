import "dotenv/config";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { userRepository } from "../repositories";
import { TLoginReturn, TUserLogin } from "../interfaces/user.interface";
import User from "../entities/users.entity";

export const loginService = async (data: TUserLogin): Promise<TLoginReturn> => {
  const { email, password } = data;

  const user: User | null = await userRepository.findOneBy({ email });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const comparePass = await compare(password, user.password);

  if (!comparePass) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );
  return { token };
};
