const express = require("express");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");
const postController = require("../controllers/postController");
const router = express.Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(isAuthenticated, postController.createPost);

router
  .route("/:id")
  .get(postController.getOnePost)
  .patch(isAuthenticated, postController.updatePost)
  .delete(isAuthenticated, postController.deletePost);

module.exports = router;
