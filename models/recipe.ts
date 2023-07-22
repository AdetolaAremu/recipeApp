import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      required: [true, "Title is required"],
      min: [5, "Title must be at least 5 characters"],
      max: [100, "Title can not be more than 100 characters"],
    },
    description: {
      required: [true, "Description is required"],
      min: [10, "Description must be at least 10 characters"],
      max: [600, "Description can not be more than 600 characters"],
    },
  },
  { timestamps: true }
);

const recipe = mongoose.model("recipe", recipeSchema);

module.exports = recipe;
