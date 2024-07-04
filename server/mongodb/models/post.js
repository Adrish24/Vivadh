import mongoose from "mongoose";

const post = new mongoose.Schema({
  _userId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String },
  topic: { type: Object, required: true },
  flair: { type: Object, required: true },
  vote_count: { type: Number, default: 0, required: true },
  vote_ref: { type: Array, required: true },
  favs_ref: { type: Array, required: true },
  comments_count: { type: Number, default: 0, required: true },
  report: { type: Array },
  createdAt: { type: Date, default: Date.now() },
  images: { type: Array },
  video: { type: Array },
  link: { type: String },
});

const postSchema = mongoose.model("post", post);

export default postSchema;
