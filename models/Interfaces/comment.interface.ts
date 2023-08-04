import { Document } from "mongoose";

export interface IComment extends Document {
  comment: String;
  user: String;
  recipe: String;
  status?: Boolean;
}
