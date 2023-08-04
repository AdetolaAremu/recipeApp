import { Document } from "mongoose";

export interface IRecipeIngredient extends Document {
  name: String;
  amount: Number;
  unit: Number;
  quantity: Number;
  measurement: Number;
  recipeID: String;
}
