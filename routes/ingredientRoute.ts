import express from "express";
import ingredientController = require("../controllers/recipeIngredientController");

const router = express.Router();

router.get("/ingredients", ingredientController.getIngredients);

router.post("/ingredients", ingredientController.createIngredient);

router.get("ingredients/:id", ingredientController.getOneIngredient);

router.patch("/ingredients/:id", ingredientController.updateIngredients);

router.delete("/ingredients/:id", ingredientController.deleteIngredient);
