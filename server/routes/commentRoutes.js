import express from "express";
import comment from "../mongodb/models/comment.js";

const router = express.Router();

// CREATE COMMENTS
router.route("/").post(async (req, res) => {
  const { form, postId, user } = req.body;

  try {
    const data = await comment.create({
      _postId: postId,
      _userId: user._id,
      author: user.username,
      content: form,
    });
    res
      .status(200)
      .send({ success: true, message: "comment sent", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
});

// GET COMMENTS
router.route("/:postId").get(async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await comment.find({ _postId: postId });
    res.status(200).send({ success: true, data: comments });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
});

export default router;
