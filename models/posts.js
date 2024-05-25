import mongoose,{Schema,models} from "mongoose";
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
    },
    {
        timestamps: true,
    }

)
const Post = models.Post || mongoose.model("Post", postSchema);
export default Post;