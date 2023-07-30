import express, { Request, Response } from "express";
import { successResponseHandler } from "../utils/responseHandler";
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
