import mongoose from "mongoose";

const user = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  topic: { type: Object },
  createdAt: { type: Date, default: Date.now() },
});

const userSchema = mongoose.model("user", user);

export default userSchema;
