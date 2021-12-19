import { Router } from "express";
import model from "../../model/contacts";

const router = new Router();


export default router.get("/", async (req, res, next) => {
  const contacts = await model.listContacts();
  res.status(200).json(contacts);
});


// export default router