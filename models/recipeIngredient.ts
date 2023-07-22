import mongoose from "mongoose";

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
      default: 0,
    },
    unit: {
      type: Number,
      required: [true, "Unit is required"],
      min: [1, "Unit has to be at least one"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    measurement: {
      type: Number,
      required: [true, "Measurement is required"],
    },
  },
  { timestamps: true }
);

const Ingredients = mongoose.model("Ingredients", recipeIngredientSchema);

module.exports = Ingredients;
