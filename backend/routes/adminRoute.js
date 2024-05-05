const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const adminController = require("../controllers/adminController");
const {upload} = require("../middleware");


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const category = req.body.category; // Retrieve category from request body
//         if(!category) {
//             throw new ExpressError("Category is required", 400);
//         }
//         const categoryFolder = path.join(__dirname, 'public', 'uploads', category);
//         // Create category folder if it doesn't exist
//         if (!fs.existsSync(categoryFolder)) {
//             fs.mkdirSync(categoryFolder, { recursive: true });
//         }
//         cb(null, categoryFolder);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });
// const upload = multer({ storage: './public/uploads' });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/') // Specify the destination directory for storing uploaded files
//   },
//   filename: function (req, file, cb) {
//     // Generate a unique filename by appending a timestamp to the original filename
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// });
  
// const upload = multer({ storage: storage })


// router.route("/register").post(catchAsync(adminController.register));
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