const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const userController = require("../controllers/userController");
const {upload, isUser} = require("../middleware");




router.route("/register").post(catchAsync(userController.register));

router.route("/login").post(catchAsync(userController.login));

router.route("/logout")
    .get(isUser , catchAsync(userController.logout));

router.route("makeprofile")
    .post(isUser, upload.single('resume'), catchAsync(userController.makeProfile));

router.route("/profile")
    .get(isUser,catchAsync(userController.getProfile));



module.exports = router;