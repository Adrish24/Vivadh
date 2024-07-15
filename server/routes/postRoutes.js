import express from "express";
import post from "../mongodb/models/post.js";
import user from "../mongodb/models/user.js";
import vote from "../mongodb/models/vote.js";
import comment from "../mongodb/models/comment.js";

const router = express.Router();

// GET SINGLE POST
router.route("/:postId").get(async (req, res) => {
  const { postId } = req.params;
  const { currentUserId } = req.query;

  try {
    const item = await post.findOne({ _id: postId });
    const userInfo = await user.findOne({ _id: item._userId });
    const votes = await vote.find({ _id: item.vote_ref });
    const comments = await comment.find({ _postId: postId });

    // check if current user has given votes to each post
    const currentUserGivenVote = votes.find((v) => v._userId === currentUserId);

    // counting votes
    const upVotes = votes.filter((v) => v.voteType === "upVote");
    const downVotes = votes.filter((v) => v.voteType === "downVote");
    const newVoteCount = upVotes.length - downVotes.length;

    res.status(200).send({
      success: true,
      data: {
        ...item._doc,
        username: userInfo.username,
        upVote: currentUserGivenVote?.voteType === "upVote" ? true : false,
        downVote: currentUserGivenVote?.voteType === "downVote" ? true : false,
        vote_count: newVoteCount,
        comments_count: comments.length,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
});

// GET ALL POSTS
router.route("/").get(async (req, res) => {
  const { currentUserId } = req.query;
  try {
    const items = await post.find({});
    const newPosts = items.map(async (item) => {
      const votes = await vote.find({ _id: item.vote_ref });
      const userInfo = await user.findOne({ _id: item._userId });
      const comments = await comment.find({ _postId: item._id });

      // check if current user has given votes to each post
      const currentUserGivenVote = votes.find(
        (v) => v._userId === currentUserId
      );

      // counting votes
      const upVotes = votes.filter((v) => v.voteType === "upVote");
      const downVotes = votes.filter((v) => v.voteType === "downVote");
      const newVoteCount = upVotes.length - downVotes.length;

      return {
        ...item._doc,
        username: userInfo.username,
        upVote: currentUserGivenVote?.voteType === "upVote" ? true : false,
        downVote: currentUserGivenVote?.voteType === "downVote" ? true : false,
        vote_count: newVoteCount,
        comments_count: comments.length,
      };
    });
    const posts = await Promise.all(newPosts);

    res.status(200).send({ success: true, data: posts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
});

// CREATE POST
router.route("/").post(async (req, res) => {
  const { form, user } = req.body;
  const { type } = req.query;
  console.log(type);
  try {
    const data = await post.create({
      _userId: user._id,
      username: user.username,
      title: form.title,
      content: type === "text" ? form.body : null,
      topic: form.topic,
      flair: form.flair,
      images: type === "image" ? form.body.map((image) => image.url) : [],
      video: type === "video" ? form.body : [],
    });
    res
      .status(200)
      .send({ success: true, message: "post successful", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
});

export default router;
