import mongoose, { Model } from "mongoose";
import { IModelDocument } from "../model.interface";

const recipeIngredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ingredient Name is required"],
      min: [3, "Ingredient Name must be more than 3"],
      max: [150, "Ingredient Name must not be more than 150"],
    },
    amount: {
      type: Number,
      // required: [true, 'Amount is required'],
      default: 0,
    },
    unit: {
      type: Number,
      required: [true, "Unit is required"],
      min: [1, "Unit has to be at least one"],
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Ingredients: Model<IModelDocument> = mongoose.model<IModelDocument>(
  "Ingredients",
  recipeIngredientSchema
);

module.exports = Ingredients;
