const express = require("express");
const userController = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/:id").get(isAuthenticated, userController.getUser);

router.route("/").get(isAuthenticated, isAdmin, userController.getUsers);

module.exports = router;
