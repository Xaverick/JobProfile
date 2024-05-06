const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const adminController = require("../controllers/adminController");
const {upload} = require("../middleware");

router.route("/register").post(catchAsync(adminController.register));
router.route("/login").post(catchAsync(adminController.login));

router.route("/logout").get(catchAsync(adminController.logout));

router.route("/addcategory")
    .post(catchAsync(adminController.addCategory))

router.route("/getcategories")
    .get(catchAsync(adminController.getCategories));

router.route("/category/:id")
    .get(catchAsync(adminController.getCategory))
    .put(catchAsync(adminController.updateCategory))
    .delete(catchAsync(adminController.deleteCategory));


router.route("/addresume")
    .post(upload.single('resume'), catchAsync(adminController.uploadResume));

// router.post('/uploadResume', upload.single('resumes'), (req, res) => {
//     const { category } = req.body;
//     res.status(200).json({ message: "Resume uploaded successfully" });
// });


module.exports = router;