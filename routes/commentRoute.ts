import express from "express";
const commentController = require("../controllers/commentController");

const router = express.Router({ mergeParams: true });

router.get("/", commentController.getAllComments);

router.post("/", authController.privateRoute, commentController.createComments);
router
  .route("/:id")
  .patch(authController.privateRoute, commentController.updateComment)
  .delete(authController.privateRoute, commentController.deleteComment);
