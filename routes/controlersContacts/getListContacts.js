import { Router } from "express";
import contactsApp from "../../contactsApi/operations/listContacts";
const routerListContacts = new Router();
routerListContacts.get("/", async (_req, res, _next) => {
  const contacts = await contactsApp.listContacts();
  res.status(200).json(contacts);
});
export default routerListContacts;