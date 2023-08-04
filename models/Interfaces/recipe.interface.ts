import { Document } from "mongoose";

export interface IRecipe extends Document {
  title: String;
  description: String;
  suggestion: String;
  user: Boolean;
}
