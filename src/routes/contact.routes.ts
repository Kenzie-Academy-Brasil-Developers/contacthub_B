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
} from "../middlewares/globals.middlewares";
import { createNewContactSchema } from "../schemas/contact.schema";
import {
  checkingContactEmail,
  checkingContactName,
  checkingContactPhone,
} from "../middlewares/contact.middleware";

export const contactRouter: Router = Router();
contactRouter.use("/contact", contactRouter)


contactRouter.post(
  "/",
  checkingBody(createNewContactSchema),
  checkingContactEmail,
  checkingContactName,
  checkingContactPhone,
  createContactController
);


contactRouter.get("/:id", readContacSpecificController);

contactRouter.get("/all/contacts", readAllContactController);


contactRouter.patch(
  "/:id",
  checkingContactEmail,
  checkingContactName,
  checkingContactPhone,
  updateContactController
);


contactRouter.delete("/:id", deleteContactController);
