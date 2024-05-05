const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const userController = require("../controllers/userController");

router.route("/register").post(catchAsync(userController.register));

router.route("/login").post(catchAsync(userController.login));

router.route("/logout").get(catchAsync(userController.logout));

module.exports = router;