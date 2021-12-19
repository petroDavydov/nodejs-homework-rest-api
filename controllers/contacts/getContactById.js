import { Router } from "express";
import model from "../../model/contacts";
import {validateId } from "../../middleware/validation/validation";

const router = new Router();

export default router.get("/:id", validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not Found" });
});

// export default router