import { NextFunction, Request } from "express";
import { successResponseHandler } from "../utils/responseHandler";
const catchAsync = require("../utils/catchAsync");
const Recipe = require("../models/recipe");
const Ingredients = require("../models/recipeIngredient");
const APIFeatures = require("../utils/apiFeatures");

export const createRecipe = catchAsync(async (req: Request) => {
  const { title, description, suggestion, user } = req.body;
  const ingredientsData = req.body.ingredients;

  const recipe = await Recipe.create({
    title,
    description,
    suggestion,
    user,
  });

  const createdIngredients = [];

  for (const ingredientData of ingredientsData) {
    const { name, amount, unit, quantity, measurement } = ingredientData;

    const ingredient = await Ingredients.create({
      name,
      amount,
      unit,
      quantity,
      measurement,
      recipeID: recipe._id,
    });

    createdIngredients.push(ingredient);
  }

  recipe.ingredients = createdIngredients.map((ingredient) => ingredient._id);
  await recipe.save();

  successResponseHandler(201, "Recipe created successfully", recipe);
});

export const getAllRecipes = catchAsync(async (req: Request) => {
  const Features = new APIFeatures(Recipe.find(), req.query)
    .sort()
    .paginate()
    .filter()
    .fields();

  const recipes = await Features.query;

  successResponseHandler(
    200,
    "Recipes retrieved successfully",
    recipes,
    recipes.length
  );
});

export const getOneRecipe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const recipe = await Recipe.findbyId(req.params.id)
      .populate("theIngredients")
      .populate("theComments");

    if (!recipe) {
      return next(new AppError("Recipe not found", 404));
    }

    successResponseHandler(200, "Recipe retrieved successfully", recipe);
  }
);

export const updateRecipe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, suggestion, ingredients } = req.body;
    const { id } = req.params;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, description, suggestion },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return next(new AppError("Recipe not found", 404));
    }

    const createdIngredients = [];

    for (const ingredientData of ingredients) {
      const { name, amount, unit, quantity, measurement } = ingredientData;

      const ingredient = await Ingredients.findOneAndUpdate(
        { _id: ingredientData._id },
        {
          name,
          amount,
          unit,
          quantity,
          measurement,
          recipeID: updatedRecipe._id,
        },
        { upsert: true, new: true, runValidators: true }
      );

      createdIngredients.push(ingredient);
    }

    updatedRecipe.ingredients = createdIngredients.map(
      (ingredient) => ingredient._id
    );
    await updatedRecipe.save();

    successResponseHandler(200, "Recipe updated successfully", updatedRecipe);
  }
);

export const deleteRecipe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const deletedIngredients = await Ingredients.deleteMany({ recipeID: id });

    if (!deletedIngredients) {
      return next(new AppError("Error deleting ingredients", 500));
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return next(new AppError("Recipe not found", 404));
    }

    successResponseHandler(
      200,
      "Recipe and associated ingredients deleted successfully"
    );
  }
);
