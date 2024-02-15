import User from "../entities/users.entity";
import { AppError } from "../errors/AppError";
import { userRepository, contactRepository } from "../repositories";

export const generateFullReportService = async (userId: number) => {
  const user: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const totalContacts = await contactRepository.count({ where: { user } });

  const recentContacts = await contactRepository.find({
    where: { user },
    order: { createdAt: "DESC" },
    take: 4,
  });

  return {
    user,
    totalContacts,
    recentContacts,
  };
};
