import { NextFunction, Request, Response } from "express";
import { successResponseHandler } from "../utils/responseHandler";
import { IComment } from "../models/Interfaces/comment.interface";
import { filterObj } from "../utils/shared";
const APIFeatures = require("../utils/apiFeatures");
const Comment = require("../models/commentModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

export const getAllComments: void = catchAsync(async (req: Request) => {
  let filter: any = {};

  if (req.params.movieID) filter = { movie: req.params.movieID };

  const Features = new APIFeatures(Comment.find(filter), req.query)
    .sort()
    .fields()
    .filter()
    .paginate();

  const comments = await Features.query;

  return successResponseHandler(
    200,
    "Comments retrieved successfully",
    comments,
    comments.length
  );
});

export const createComment: void = catchAsync(async (req: Request) => {
  const comment: IComment = await Comment.create({
    comment: req.body.comment,
    user: req.body.user,
    recipe: req.body.recipe,
  });

  return successResponseHandler(201, "Comment created successfully", comment);
});

export const getAComment: void = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const comment: Object = await Comment.findById(req.params.id);

    if (!comment) {
      return next(new AppError("Comment not found", 404));
    }

    return successResponseHandler(
      200,
      "Comment retrieved successfully",
      comment
    );
  }
);

export const updateComment: void = catchAsync(async (req: Request) => {
  const filteredObjs: Object = filterObj(req.body, "comment");

  const comment: Object = await Comment.findByIdAndUpdate(
    req.params.id,
    filteredObjs,
    {
      new: true,
      runValidators: true,
    }
  );

  return successResponseHandler(200, "Comment updated successfully");
});

export const deleteComment: void = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const comment: Object = await Comment.findById(req.params.id);

    if (!comment) {
      return next(new AppError("Comment not found", 404));
    }

    return successResponseHandler(200, "Comment deleted successfully");
  }
);
