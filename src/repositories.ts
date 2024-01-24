import { AppDataSource } from "./data-source";
import Contact from "./entities/contacts.entity";
import User from "./entities/users.entity";
import { TContactRepository } from "./interfaces/contact.interface";
import { TUserRepository } from "./interfaces/user.interface";


export const userRepository: TUserRepository = AppDataSource.getRepository(User);
export const contactRepository: TContactRepository = AppDataSource.getRepository(Contact);