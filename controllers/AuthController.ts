import { NextFunction } from "express";
import { IUserDocument } from "../models/userModel";
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel.ts");

const jwtSignedToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

exports.registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const getToken = (Math.random() + 1).toString(10).substring(2);

    await User.create({
      firstName: req.body?.firstName,
    });
  }
);
