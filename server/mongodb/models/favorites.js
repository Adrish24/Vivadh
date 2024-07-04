import mongoose from "mongoose";

const favorite = new mongoose.Schema({
  _postId: { type: String, required: true },
  _userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const favoriteSchema = mongoose.model("favorite", favorite);

export default favoriteSchema;
