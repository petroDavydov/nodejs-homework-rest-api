import { Router } from "express";
import model from "../../model/contacts";
import {validateId } from "../../middleware/validation/validation";

const router = new Router();


export default router.delete("/:id", validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.removeContact(id);
  if (contact) {
    return res.status(200).json({ message: "Contact deleted" });
  }
  res.status(404).json({ message: "Not Found" });
});

// export default router