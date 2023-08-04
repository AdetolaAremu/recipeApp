import { NextFunction, Request } from "express";
import { successResponseHandler } from "../utils/responseHandler";
import { filterObj } from "../utils/shared";
import { IRecipeIngredient } from "../models/Interfaces/ingredients.interface";
const catchAsync = require("../utils/catchAsync");
const Ingredients = require("../models/recipeIngredient");
const APIFeatures = require("../utils/apiFeatures");

export const createIngredient = catchAsync(async (req: Request) => {
  const ingredientsData = req.body.ingredients;

  const createdIngredients: IRecipeIngredient[] = [];

  for (const ingredientData of ingredientsData) {
    const ingredient = await Ingredients.create({
      name: ingredientData.name,
      amount: ingredientData.amount,
      unit: ingredientData.unit,
      quantity: ingredientData.quantity,
      measurement: ingredientData.measurement,
      recipeID: ingredientData.recipeID,
    });

    createdIngredients.push(ingredient);
  }

  successResponseHandler(
    201,
    "Recipe ingredients created successfully",
    createdIngredients
  );
});

export const getIngredients = catchAsync(async (req: Request) => {
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

export const getOneIngredient = catchAsync(
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

export const updateIngredients = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ingredientsData = req.body.ingredients;

    const updatedIngredients: IRecipeIngredient[] = [];

    for (const ingredientData of ingredientsData) {
      const ingredient = await Ingredients.findById(ingredientData.id);

      if (!ingredient) {
        return next(
          new AppError(`Ingredient with ID ${ingredientData.id} not found`, 404)
        );
      }

      const filteredObjs = filterObj(
        ingredientData,
        "name",
        "amount",
        "unit",
        "quantity",
        "measurement"
      );

      const updatedIngredient = await Ingredients.findByIdAndUpdate(
        ingredientData.id,
        filteredObjs,
        {
          new: true,
          runValidators: true,
        }
      );

      updatedIngredients.push(updatedIngredient);
    }

    return successResponseHandler(
      200,
      "Ingredients updated successfully",
      updatedIngredients
    );
  }
);

export const deleteIngredient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ingredientID = req.params.id;
    const deletedBlogPost = await Ingredients.findByIdAndDelete(ingredientID);

    if (!deletedBlogPost) {
      return next(new AppError("Ingredient not found", 404));
    }

    successResponseHandler(200, "Ingredient deleted successfully");
  }
);
