import express from "express";
import user from "../mongodb/models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.route("/login").post(async (req, res) => {
  try {
    const form = req.body;
    const existingUser = await user.findOne({ username: form.username });
    const passCheck =
      existingUser &&
      (await checkPassword(form.password, existingUser.password));

    if (existingUser && passCheck) {
      res.status(200).send({
        success: true,
        user: existingUser,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "wrong credentials. please try again.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
});

async function checkPassword(pass, hashedPassword) {
  return bcrypt.compare(pass, hashedPassword);
}

export default router;
