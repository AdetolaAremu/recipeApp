import mongoose, { Document, Model } from "mongoose";
import { IModelDocument } from "../model.interface";

const validator = require("validator");
const bcrypt = require("bcryptjs");

interface IUserDocument extends Document {
  password: string;
  confirmPassword?: string;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    middleName: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "Email already exist"],
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    username: {
      type: String,
      unique: [true, "Username already exist"],
      required: [true, "Username is required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm password is required"],
      validate: {
        validator: function (this: any, el: String): boolean {
          return el === this.password;
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password);

  this.confirmPassword = undefined;
});

userSchema.methods.correctPassword = async function (
  requestPassword: String,
  $dbPassword: String
) {
  return bcrypt.compare(requestPassword, $dbPassword);
};

const User: Model<IModelDocument> = mongoose.model<IModelDocument>(
  "User",
  userSchema
);

module.exports = User;
