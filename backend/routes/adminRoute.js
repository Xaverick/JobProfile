const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const adminController = require("../controllers/adminController");
const {upload, isAdmin} = require("../middleware");

router.route("/register").post(catchAsync(adminController.register));
router.route("/login").post(catchAsync(adminController.login));

router.route("/logout").get(catchAsync(adminController.logout));

router.route("/service")
    .post(isAdmin, catchAsync(adminController.createService));

router.route("/plans")
    .post( isAdmin, catchAsync(adminController.createPlan))
    .put(isAdmin, catchAsync(adminController.updatePlan))

router.route("/plans/:id")
    .delete(isAdmin, catchAsync(adminController.deletePlan));

router.route("/getProfiles")
    .get(isAdmin, catchAsync(adminController.getProfiles));

router.route("/currentPlan/:id")
    .get(isAdmin, catchAsync(adminController.userCurrentPlan));

router.route("/updateUserPlan/:userId/:serviceId/:planId")
    .put(isAdmin, catchAsync(adminController.updateUserPlan));


router.route("/editRedeemNote/:userId/:serviceId/:planId")
    .put(isAdmin, catchAsync(adminController.editRedeemNote));

module.exports = router;