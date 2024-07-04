import mongoose from "mongoose";

const comment = new mongoose.Schema({
  content: { type: String, required: true },
  _postId: { type: String, required: true },
  _userId: { type: String, required: true},
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const commentSchema = mongoose.model("comment", comment);

export default commentSchema;