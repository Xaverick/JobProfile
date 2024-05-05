const Admin = require("../models/adminModel");
const ExpressError = require("../utils/ExpressError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Category = require("../models/categoryModel");
const uploadOnCloudinary = require("../utils/cloudinary");

const fs = require('fs');
const path = require('path');
const multer = require('multer');

// module.exports.register = async (req, res) => {
//     const { username, email, password } = req.body;
//     if(!username || !email || !password) {
//         throw new ExpressError("All fields are required", 400);
//     }
//     const admin = await Admin.findOne({email});
//     if(admin) {
//         throw new ExpressError("Admin already exists", 400);
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const newAdmin = new Admin({ username, email, password: hashedPassword });
//     await newAdmin.save();
//     const token = jwt.sign({ id: newAdmin._id }, process.env.ADMIN_SECRET);
//     res.status(201).json({ token });
    
// }


module.exports.login = async (req, res) => {
    console.log("In Login");
    let { email, password } = req.body;
    email = email.toLowerCase();
    if(!email || !password) {
        throw new ExpressError("All fields are required", 400);
    }
    const admin = await Admin.findOne({email});
    if(!admin) {
        throw new ExpressError("Invalid credentials", 400);
    }
    const isMatch = bcrypt.compareSync(password, admin.password);
    if(!isMatch) {
        throw new ExpressError("Invalid credentials", 400);
    }
    const token = jwt.sign({ id: admin._id }, process.env.ADMIN_SECRET, { expiresIn: '3h'});
    res.cookie('adminjwt', token, { signed: true, httpOnly: true, sameSite: 'none', maxAge: 1000 * 60 * 60* 3, secure: true })
    const payload = { adminId: admin._id, email: admin.email, username: admin.username };
    res.status(200).json({ payload, expiresIn: 1000 * 60 * 60* 3});
    
}

module.exports.logout = async (req, res) => {
    console.log("In Logout");
    res.clearCookie('adminjwt');
    res.status(200).json({ message: "Logged out successfully" });
}


module.exports.addCategory = async (req, res) => {
    const { name, desciption } = req.body;
    if(!name || !desciption) {
        throw new ExpressError("Category's name and desciption are required", 400);
    }
    const category = new Category({ name, desciption });
    await category.save();
    res.status(201).json({ message: "Category added successfully" });
}

//All Categories
module.exports.getCategories = async (req, res) => {
    const categories = await Category.find({});
    res.status(200).json(categories);
}

//specific Category
module.exports.getCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category) {
        throw new ExpressError("Category not found", 404);
    }
    res.status(200).json(category);
}

module.exports.updateCategory = async (req, res) => {
    const { name, desciption } = req.body;
    if(!name || !desciption) {
        throw new ExpressError("Category's name and desciption are required", 400);
    }
    const category = await Category.findByIdAndUpdate(req.params.id, { name, desciption });
    if(!category) {
        throw new ExpressError("Category not found", 404);
    }
    res.status(200).json({ message: "Category updated successfully" });
}


module.exports.deleteCategory = async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if(!category) {
        throw new ExpressError("Category not found", 404);
    }
    res.status(200).json({ message: "Category deleted successfully" });
}


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const category = req.body.category; // Retrieve category from request body
//         const categoryFolder = path.join(__dirname, '..', 'uploads', category);
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
// const upload = multer({ storage: storage });

//Upload Resume
// module.exports.uploadResume = async (req, res) => {
//     const { category } = req.body;
//     if(!category) {
//         throw new ExpressError("Category is required", 400);
//     }
//     const categoryFolder = path.join(__dirname, '..', 'uploads', category);
//     // Create category folder if it doesn't exist
//     if (!fs.existsSync(categoryFolder)) {
//         fs.mkdirSync(categoryFolder, { recursive: true });
//     }
//     const file = req.files.file;
//     const filePath = path.join(categoryFolder, file.name);
//     file.mv(filePath, async (err) => {
//         if (err) {
//             throw new ExpressError(err.message, 500);
//         }
//         res.status(200).json({ message: "Resume uploaded successfully" });
//     });
// }




module.exports.uploadResume = async (req, res, next) => {
    console.log(req.files);
    const resumeLocalPath = req.files?.resume.path;
    if(!resumeLocalPath) {
        return res.status(400).json({ message: 'Resume not uploaded' });
    }
    const resume = await uploadOnCloudinary(resumeLocalPath);
    if(!resume) {
        return res.status(500).json({ message: 'Failed to upload resume' });
    }

    console.log(resume.secure_url);

    res.status(200).json({ message: 'Resumes uploaded successfully' });
}

// Controller function for uploading resumes
// module.exports.uploadResume = (req, res, next) => {
//     console.log(req.body);
//     console.log(req.files);
//     upload.any()(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ message: err.message }); // Handle error here
//         }
//         res.status(200).json({ message: 'Resumes uploaded successfully' });
//     });
// };


