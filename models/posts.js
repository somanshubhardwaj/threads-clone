import mongoose, { Schema, models } from "mongoose";
const postSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likecount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        text: String,
        name: String,
        email: String,
      },
    ],
    commentcount: {
      type: Number,
      default: 0,
    },
    
  },
  {
    timestamps: true,
  }
);
const Post = models.Post || mongoose.model("Post", postSchema);
export default Post;
