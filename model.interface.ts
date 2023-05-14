import Document from "mongoose";

export interface IModelDocument extends Document {
  password: string;
  confirmPassword?: string;
  updatedAt?: Date;
}
