const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const userController = require("../controllers/userController");
const { isUser, upload} = require("../middleware");


router.route("/register").post(catchAsync(userController.register));

router.route("/login").post(catchAsync(userController.login));

router.route("/logout")
    .get(isUser , catchAsync(userController.logout));

router.route('/forgotpassword')
    .post(catchAsync(userController.forgotPassword));

router.route('/resetpassword/:id/:token')
    .get((req, res) => {
        const { id, token } = req.params;
        res.render('resetpassword', { id, token });
    })
    .post(catchAsync(userController.resetPassword));


router.route("/contact")
    .post(catchAsync(userController.contactUs));

router.route("/createProfile")
    .post(isUser, upload.single('file'), catchAsync(userController.createProfile));

router.route("/userDetails")
    .get(isUser,catchAsync(userController.getUser));

router.route("/getProfile")
    .get(isUser,catchAsync(userController.getUserProfile));

router.route("/editProfile")
    .put(isUser,upload.single('file'), catchAsync(userController.updateProfile));

router.route("/getPlans")
    .get(catchAsync(userController.getPlans));

router.route('/currentplan')
    .get(isUser, catchAsync(userController.getCurrentPlan));

router.route("/orderHistory")
    .get(isUser, catchAsync(userController.getOrderHistory));
    

module.exports = router;