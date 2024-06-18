const Admin = require("../models/adminModel");
const ExpressError = require("../utils/ExpressError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Category = require("../models/planModel");
const uploadOnCloudinary = require("../utils/cloudinary");
const Plan = require('../models/planModel')
const Service = require('../models/servicesModel');
const Profile = require('../models/profileModel');
const User = require('../models/userModel');
const userPlanStatus = require("../models/userPlanStatus");
const MailSender = require('../utils/MailSender');

module.exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        throw new ExpressError("All fields are required", 400);
    }
    const admin = await Admin.findOne({email});
    if(admin) {
        throw new ExpressError("Admin already exists", 400);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();
    // const token = jwt.sign({ id: newAdmin._id }, process.env.ADMIN_SECRET);
    res.status(200).json({ message: "Admin registered successfully" });
    
}


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
    // res.cookie('adminjwt', token, { signed: true, httpOnly: true, sameSite: 'none', maxAge: 1000 * 60 * 60* 3, secure: true })
    res.cookie('adminjwt', token, { signed: true, maxAge: 1000 * 60 * 60 * 3, httpOnly: true}); 
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
    console.log("In uploadResume");
    // console.log(req.file);
    console.log(req.file?.path);
    const resumeLocalPath = req.file?.path;
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

module.exports.createService = async (req, res) => {
    let { title, description } = req.body;
    if(!title) {
        throw new ExpressError("Service is required", 400);
    }
    title = title.toLowerCase();
    const service = new Service({ title, description });
    await service.save();
    res.status(200).json({ message: "Service created successfully" });
}

module.exports.createPlan = async (req, res) => {
    let { title, validity, price, services } = req.body;
    if(!title || !validity || !price || !services) {
        throw new ExpressError("Plan is required", 400);
    }

    title = title.toLowerCase();

    const newPlan = new Plan({ 
        title,
        validity,
        price,
        services
    });

    await newPlan.save();
    res.status(200).json(newPlan);
}

module.exports.updatePlan = async (req, res) => {
    let { title, validity, price, services, _id } = req.body;
    if(!title || !validity || !price || !services || !_id) {
        throw new ExpressError("Plan is required", 400);
    }
    title = title.toLowerCase();
    const plan = await Plan.findById(_id);
    plan.title = title;
    plan.validity = validity;
    plan.price = price;
    plan.services = services;
    await plan.save();
    res.status(200).json(plan);

}


module.exports.deletePlan = async (req, res) => {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if(!plan) {
        throw new ExpressError("Plan not found", 404);
    }
    res.status(200).json({ message: "Plan deleted successfully" });
}



module.exports.getProfiles = async (req, res) => {
    const subscribedUsers = await User.find({ currentPlan: { $ne: null } });
    res.status(200).json(subscribedUsers);
}


module.exports.userCurrentPlan = async (req, res) => {
    const user = await User.findById(req.params.id);
    let plans = [];
    for(let i=0; i<user.currentPlan.length; i++){
        let plan = await userPlanStatus.findById(user.currentPlan[i]);
        plans.push(plan);
    }
    const profile = await Profile.findOne({userId: req.params.id});
    res.status(200).json({ user: user, plan: plans, profile: profile });
}

module.exports.updateUserPlan = async (req, res) => {
    const { userId, serviceId, planId} = req.params;
    const {calls, note} = req.body;
    const user = await User.findById(userId);
    const userPlan = await userPlanStatus.findById(planId);

    if(!userPlan) {
        throw new ExpressError("User plan not found", 404);
    }

    const service = userPlan.plan.services.find(service => service._id == serviceId);

    if(!service) {
        throw new ExpressError("Service not found", 404);
    }

    if(calls > service.maxCalls) {
        throw new ExpressError("Calls cannot be greater than max calls", 400);
    }

    if(calls - service.service.calls > 0){

        userPlan.plan.redeemHistory.push({
            title: service.service.title,
            Date: Date.now(),
            calls: calls,
            notes: note
        });

        service.service.calls = calls;
        const sending = await MailSender(user.email, 
            "Plan Status Update", 
            `<p>Dear ${user.name},</p>
            <p>You Have used ${calls} calls on ${service.service.title}. </p>
            <p>You have ${service.maxCalls - service.service.calls} calls left</p>`,
        ); 
        
    }
    
    
    service.service.calls = calls;
    await userPlan.save();
    res.status(200).json(userPlan);

}


module.exports.editRedeemNote = async (req, res) => {
    const { userId, serviceId, planId } = req.params;
    console.log(serviceId);
    const {note} = req.body;
    const user = await User.findById(userId);
    const userPlan = await userPlanStatus.findById(planId);
    if(!userPlan) {
        throw new ExpressError("User plan not found", 404); 
    }

    const redeemHistory = userPlan.plan.redeemHistory.find(item => item._id == serviceId);

    if(!redeemHistory) {
        throw new ExpressError("Service not found", 404);
    }

    redeemHistory.notes = note;
    await userPlan.save();
    res.status(200).json(userPlan);
}
