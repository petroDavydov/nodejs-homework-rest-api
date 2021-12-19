import { Router } from "express";
import model from "../../model/index";

const router = new Router();

router.get("/", async (req, res, next) => {
  const contacts = await model.listContacts();
  res.status(200).json(contacts);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not Found" });
});

router.post("/", async (req, res, next) => {
  const newContact = await model.addContact(req.body);
  res.status(200).json(newContact);
});


























router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.removeContact(id);
  if (contact) {
    return res.status(200).json({ message: "Contact deleted" });
  }
  res.status(404).json({ message: "Not Found" });
});
































router.patch("/:id", async (req, res, next) => {
  res.json({ message: "template message" });
});

export default router;
