import { Document } from "mongoose";

export interface IUserDocument extends Document {
  password: String;
  confirmPassword?: String;
  updatedAt?: Date;
  firstName: String;
  lastName: String;
  middleName: String;
  email: String;
  username: String;
}
