import { Router } from "express";
import model from "../../model/contacts";
import { validateCreate} from "../../middleware/validation/validation";

const router = new Router();

router.post("/", validateCreate, async (req, res, next) => {
  const newContact = await model.addContact(req.body);
  res.status(201).json(newContact);
});

export default router