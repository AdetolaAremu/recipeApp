import { NextFunction, Request, Response } from "express";
import { successResponseHandler } from "../utils/responseHandler";
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel.ts");

const jwtSignedToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

exports.registerUser = catchAsync(async (req: Request) => {
  const getToken = (Math.random() + 1).toString(10).substring(2);

  const regUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    middleName: req.body.middleName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    otp: getToken,
  });

  successResponseHandler(200, "Account registration successfull", regUser);
});

exports.loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.email && req.body.password) {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(
          new AppError("Email and/or Password fields can not be empty", 422)
        );
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(
          new AppError(
            "User does not exist, please reconfirm your credentials",
            404
          )
        );
      }

      if (user.otpVerified !== true) {
        return next(
          new AppError(
            "You have not verified your account, please check your mail for verification code or link",
            400
          )
        );
      }

      if (!(await user.correctPassword(password, user.password))) {
        return next(new AppError("Email and Password do not match", 400));
      }

      const token = jwtSignedToken(user.id);

      const jwtExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN
        ? Number(process.env.JWT_COOKIE_EXPIRES_IN)
        : 1;

      const cookieOptions = {
        expires: new Date(Date.now() + jwtExpiresIn * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secured: true,
      };

      res.cookie("jwt", token, cookieOptions);

      if (process.env.NODE_ENV === "production") cookieOptions.secured = true;

      res.status(200).json({
        message: "Login successful",
        token,
      });
    } else {
      return next(
        new AppError("Email and Password fields cannot be empty", 422)
      );
    }
  }
);
