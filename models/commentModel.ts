import mongoose, { Model } from "mongoose";
import { IComment } from "./Interfaces/comment.interface";

const commentSchema = new mongoose.Schema<IComment>(
  {
    comment: {
      type: String,
      required: [true, "Comment is required"],
      minlength: [10, "Comment can not be less than 10 characters"],
      maxlength: [350, "Comment can not be more than 350 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment has to belong to a user"],
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipe",
      required: [true, "Comment has to belong to a recipe"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment: Model<IComment> = mongoose.model<IComment>(
  "Comment",
  commentSchema
);

module.exports = Comment;
