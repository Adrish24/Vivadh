import express from "express";
import bcrypt from "bcrypt";

import user from "../mongodb/models/user.js";

const router = express.Router();

router.route("/signup").post(async (req, res) => {
  try {
    const form = req.body;

    const existingUser = await user.findOne({ username: form.username });

    if (!existingUser) {
      await user.create({
        username: form.username,
        password: await generateHashedPassword(form.password),
      });
      res.status(200).send({
        success: true,
        message: "user created successfully",
      });
    } else {
      res.status(200).send({ success: false, message: "user already exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
});

async function generateHashedPassword(pass) {
  return bcrypt.hash(pass, 10);
}

export default router;
