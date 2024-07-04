import express from "express";
import vote from "../mongodb/models/vote.js";
import post from "../mongodb/models/post.js";

const router = express.Router();


router.route("/").post(async (req, res) => {
  try {
    const { type, postId, currentUserId } = req.body;
    console.log(type, postId, currentUserId);

    const existingVote = await vote.findOne({ _postId: postId, _userId: currentUserId })


    // Check if user already voted or not
    if (!existingVote) {
      await vote.create({
        _userId: currentUserId,
        _postId: postId,
        voteType: type,
      });
    } else {
      await vote.findOneAndUpdate(
        { _postId: postId, _userId: currentUserId },
        { voteType: type }
      );
    }

    // Delete vote if same user clicked on vote again
    if (
      existingVote?._userId === currentUserId &&
      existingVote._postId === postId &&
      existingVote?.voteType === type
    ) {
      await vote.deleteOne({ _id: existingVote._id });
    }

    const votes = await vote.find({ _postId: postId });
    const voteIds = votes.map((vote) => vote._id);
    console.log(votes);
    await post.findByIdAndUpdate(postId, {
      vote_count: votes?.length,
      vote_ref: voteIds,
    });
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ sucess: false });
  }
});

export default router;
