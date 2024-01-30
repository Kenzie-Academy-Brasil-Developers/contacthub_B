import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  readAllContactController,
  readContacSpecificController,
  updateContactController,
} from "../controllers/contact.controller";
import {
  checkingBody,
  checkingToken,
} from "../middlewares/globals.middlewares";
import { createNewContactSchema } from "../schemas/contact.schema";
import {
  checkingContactEmail,
  checkingContactName,
  checkingContactPhone,
} from "../middlewares/contact.middleware";

export const contactRouter: Router = Router();

contactRouter.post(
  "/",
  checkingBody(createNewContactSchema),
  checkingToken,
  checkingContactEmail,
  checkingContactName,
  checkingContactPhone,
  createContactController
);

contactRouter.get("/:id", checkingToken, readContacSpecificController);
contactRouter.get("/", checkingToken, readAllContactController);
contactRouter.patch(
  "/:id",
  checkingToken,
  checkingContactEmail,
  checkingContactName,
  checkingContactPhone,
  updateContactController
);
contactRouter.delete("/:id", deleteContactController);
