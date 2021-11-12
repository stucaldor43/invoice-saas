const express = require("express");
const { getUser } = require("./../models/user");
const { authorize } = require("../middleware/auth");

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

module.exports = router;
