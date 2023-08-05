import express from "express";
const recipeController = require("../controllers/recipeController");
const authController = require("../controllers/AuthController");
const commentRoute = require("./commentRoute");

const router = express.Router();

router.use("/:recipeid/comments", commentRoute);

router.get("/", authController.privateRoute, recipeController.getAllRecipe);

router.post("/", authController.privateRoute, authController.createRecipe);

router
  .route("/:id")
  .get(authController.privateRoute, authController.getOneRecipe)
  .patch(authController.privateRoute, authController.updateRecipe)
  .delete(authController.privateRoute, authController.deleteRecipe);

module.exports = router;
