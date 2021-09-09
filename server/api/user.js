import express from "express";
import { getUser } from "./../models/user";
import { authorize } from "../middleware/auth";

const router = express.Router();

router.get("/:id", authorize("read:user"), async function (req, res) {
  const id = Number(req.params.id);
  if (req.session.user.id !== Number(id)) return res.sendStatus(401);

  try {
    const user = await getUser({ id });

    res.status(201).json(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
