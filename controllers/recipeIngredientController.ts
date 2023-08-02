import express, { NextFunction, Request } from "express";
import { successResponseHandler } from "../utils/responseHandler";
import { filterObj } from "../utils/shared";
const catchAsync = require("../utils/catchAsync");
const Ingredients = require("../models/recipeIngredient");
const APIFeatures = require("../utils/apiFeatures");

exports.getIngredients = catchAsync(async (req: Request) => {
  const ingredient = await Ingredients.create({
    name: req.body.name,
    amount: req.body.amount,
    unit: req.body.unit,
    quantity: req.body.quantity,
    measurement: req.body.measurement,
  });

  successResponseHandler(
    200,
    "Recipe ingredients created successfully",
    ingredient
  );
});

exports.getIngredients = catchAsync(async (req: Request) => {
  const Features = new APIFeatures(Ingredients.find(), req.query)
    .sort()
    .paginate()
    .filter()
    .fields();

  const ingredients = await Features.query;

  successResponseHandler(
    200,
    "Ingredients retrieved successfully",
    ingredients,
    ingredients?.length
  );
});

exports.getOneIngredient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ingredients = await Ingredients.findbyId(req.params.id);

    if (!ingredients) {
      return next(new AppError("Ingredient not found", 404));
    }

    successResponseHandler(
      200,
      "Ingredients retrieved successfully",
      ingredients
    );
  }
);

exports.createIngredient = catchAsync(async (req: Request) => {
  const ingredient = await Ingredients.create({
    name: req.body.name,
    amount: req.body.amount,
    unit: req.body.unit,
    quantity: req.body.quantity,
    measurement: req.body.measurement,
  });

  successResponseHandler(201, "Ingredient created successfully", ingredient);
});

exports.updateIngredient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ingredient = await Ingredients.findbyId(req.params.id);

    if (!ingredient) {
      return next(new AppError("Ingredient not found", 404));
    }

    const filteredObjs = filterObj(
      req.body,
      "name",
      "amount",
      "unit",
      "quantity",
      "measurement"
    );

    const updatedIngredient = await Ingredients.findByIdAndUpdate(
      req.params.id,
      filteredObjs,
      {
        new: true,
        runValidators: true,
      }
    );

    return successResponseHandler(
      200,
      "Ingredient updated successfully",
      updatedIngredient
    );
  }
);
