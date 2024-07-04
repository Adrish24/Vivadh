import express from "express";
import favorites from "../mongodb/models/favorites.js";
import post from "../mongodb/models/post.js";
import vote from "../mongodb/models/vote.js";
import user from "../mongodb/models/user.js";

const router = express.Router();

// GET FAVORITE POSTS
router.route("/").get(async (req, res) => {
  const { currentUserId } = req.query;
  try {
    const favRefs = await favorites.find({ _userId: currentUserId });
    const newFavs = favRefs.map(async (f) => {
      const fav = await post.findOne({ _id: f._postId });

      if (!fav) return;

      const votes = await vote.find({ _id: fav?.vote_ref });
      const userInfo = await user.findOne({ _id: currentUserId });

      // check if current user has given votes to each post
      const currentUserGivenVote = votes.find(
        (v) => v._userId === currentUserId
      );

      // counting votes
      const upVotes = votes.filter((v) => v.voteType === "upVote");
      const downVotes = votes.filter((v) => v.voteType === "downVote");
      const newVoteCount = upVotes.length - downVotes.length;
      return {
        ...fav?._doc,
        username: userInfo.username,
        upVote: currentUserGivenVote?.voteType === "upVote" ? true : false,
        downVote: currentUserGivenVote?.voteType === "downVote" ? true : false,
        vote_count: newVoteCount,
      };
    });

    const favs = (await Promise.all(newFavs)).filter(Boolean);

    res.status(200).send(favs);
  } catch (error) {
    console.log(error);
    res.status(404).send("failed to find favorites");
  }
});


// SAVE FAVORITE POSTS
router.route("/").post(async (req, res) => {
  const { single, currentUserId } = req.body;
  try {
    const favPostExist = await favorites.findOne({
      _userId: currentUserId,
      _postId: single._id,
    });

    const index = single.favs_ref.indexOf(currentUserId);

    if (!favPostExist && index === -1) {
      single.favs_ref.push(currentUserId);

      await favorites.create({
        _postId: single._id,
        _userId: currentUserId,
      });

      await post.findByIdAndUpdate(
        single._id,
        {
          $push: { favs_ref: currentUserId },
        },
        { new: true }
      );

      res.status(200).send({
        success: true,
        message: "added to favorites",
        data: single,
      });
    } else {
      single.favs_ref.splice(index, 1);

      await favorites.deleteOne({
        _userId: currentUserId,
        _postId: single._id,
      });
      await post.findByIdAndUpdate(
        single._id,
        {
          $pull: { favs_ref: currentUserId },
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "deleted from favorites",
        data: single,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
});

export default router;
