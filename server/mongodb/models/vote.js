import mongoose from "mongoose";

const vote = new mongoose.Schema({
  _userId: {type:String, required:true},
  _postId:{type:String, required:true},
  voteType:{type:String, enum:['upVote', 'downVote'],required:true},
  createdAt: { type: Date, default: Date.now() },
});

const voteSchema = mongoose.model("vote", vote);

export default voteSchema;