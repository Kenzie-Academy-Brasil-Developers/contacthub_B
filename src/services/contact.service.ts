import Contact from "../entities/contacts.entity";
import User from "../entities/users.entity";
import { AppError } from "../errors/AppError";
import {
  TContactReturn,
  TContactUpdate,
  TCreateContact,
  TReadAllContact,
} from "../interfaces/contact.interface";
import { contactRepository, userRepository } from "../repositories";
import { contactReturnSchema, contactSchema } from "../schemas/contact.schema";

export const createContactService = async (
  data: TCreateContact,
  userId: number
): Promise<Contact> => {
  const user: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }
  const contact: Contact | null = contactRepository.create({
    ...data,
    user: user,
  });

  await contactRepository.save(contact);
  return contactSchema.parse(contact);
};
 
export const readContacSpecificService = async (
  id: number
): Promise<Contact> => {
  const contact: Contact | null = await contactRepository.findOne({
    where: {
      id: id,
    },
  });
  if (!contact) throw new AppError("Contact not found", 404);

  return contact;
};

export const readAllContactsService = async (): Promise<TReadAllContact> => {
  const contacts: Contact[] = await contactRepository.find();

  return contacts;
};

export const updateContactService = async (
  data: TContactUpdate,
  id: number
): Promise<TContactReturn> => {
  const contactToUpdate: Contact | null = await contactRepository.findOne({
    where: {
      id: id,
    },
  });
  if (!contactToUpdate) {
    throw new AppError("Contact not found", 404);
  }

  const updatedContact: Contact = { ...contactToUpdate, ...data };

  await contactRepository.save(updatedContact);
  const parsedUpdatedContact: TContactReturn = contactReturnSchema.parse(updatedContact);
  
  return parsedUpdatedContact;
};

export const deleteContactService = async (id: number): Promise<void> => {
  const contactDelete: Contact | null = await contactRepository.findOne({
    where: {
      id: id,
    },
  });
  if (!contactDelete) {
    throw new AppError("Contact not found", 404);
  }
  await contactRepository.delete(contactDelete);
};
