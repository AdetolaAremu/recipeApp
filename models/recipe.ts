import mongoose, { Model } from "mongoose";
import { IRecipe } from "./Interfaces/recipe.interface";

const recipeSchema = new mongoose.Schema<IRecipe>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      min: [5, "Title must be at least 5 characters"],
      max: [100, "Title can not be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      min: [10, "Description must be at least 10 characters"],
      max: [600, "Description can not be more than 600 characters"],
    },
    suggestion: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

recipeSchema.virtual("theIngredients", {
  ref: "Ingredients",
  foreignField: "recipeID",
  localField: "_id",
});

recipeSchema.virtual("theIngredients", {
  ref: "Comments",
  foreignField: "recipeID",
  localField: "_id",
});

const recipe: Model<IRecipe> = mongoose.model("recipe", recipeSchema);

module.exports = recipe;
