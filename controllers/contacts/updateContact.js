import { Router } from "express";
import model from "../../model/contacts";
import {  validateUpdate, validateId } from "../../middleware/validation/validation";

const router = new Router();

export default router.put("/:id", validateUpdate, validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.updateContact(id, req.body);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not Found" });
});

// export default router;