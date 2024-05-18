const User = require("../models/userModel");
const ExpressError = require("../utils/ExpressError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uploadOnCloudinary = require("../utils/cloudinary");


module.exports.register = async (req, res) => {
    console.log("In Register");
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        throw new ExpressError("All fields are required", 400);
    }
    const user = await User.findOne({email});
    if(user) {
        throw new ExpressError("User already exists", 400);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
}

module.exports.login = async (req, res) => {

    const { email, password } = req.body;
    if(!email || !password) {
        throw new ExpressError("All fields are required", 400);
    }
    const user = await User.findOne({email});
    if(!user) {
        throw new ExpressError("Invalid credentials", 400);
    }
    
    if(!user.password){
        throw new ExpressError("Invalid credentials", 400);
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if(!isMatch) {
        throw new ExpressError("Invalid credentials", 400);
    }
    const token = jwt.sign({ id: user._id }, process.env.USER_SECRET, { expiresIn: '3h'});
    res.cookie('userjwt', {token : token, expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000)}, { signed: true, httpOnly: true, sameSite: 'none', maxAge: 1000 * 60 * 60 * 3, secure: true })
    const payload = { userId: user._id, email: user.email, name: user.name };
    res.status(200).json({ payload, expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000)});
    
}


module.exports.logout = async (req, res) => {
    console.log("In Logout");
    res.clearCookie('userjwt');
    res.status(200).json({ message: "Logged out successfully" });
}

module.exports.makeProfile = async (req, res) => {
    let { fullName, phoneNumber, education,  experience, specialization, 
        linkedIn, contactMethod, additionalInfo, referralSource, organization
    } = req.body;

    const resume = req.resume?.path;

    console.log(
        fullName, phoneNumber, education,  experience, specialization,
        linkedIn, contactMethod, additionalInfo, referralSource, organization
    );

    console.log(resume);

    if(!fullName || !phoneNumber || !education || !experience || !specialization || 
        !linkedIn || !contactMethod || !additionalInfo || !referralSource || !organization
    ) throw new ExpressError("All fields are required", 400);


    const result = await uploadOnCloudinary(resume);

    if(!result) throw new ExpressError("Upload failed", 400);

    console.log(result.url);




    // if(!firstName || !lastName || !phoneNumber || !address || !education || !experience || !skills ) res.status(400).json('missing fields');
    
    // else{

    //     experience = JSON.parse(experience);
    //     skills = JSON.parse(skills);
    //     education = JSON.parse(education);
        
    //     experience.forEach(exp => {
    //         if(!exp.title || !exp.company || !exp.startDate || !exp.endDate || !exp.description) res.status(400).json('missing fields');
    //         exp.startDate = new Date(exp.startDate);
    //         exp.endDate = new Date(exp.endDate);
    //     })

    //     experience.forEach(exp => {
    //         if(!exp.title || !exp.company || !exp.startDate || !exp.endDate || !exp.description) res.status(400).json('missing fields');
    //         exp.startDate = new Date(exp.startDate);
    //         exp.endDate = new Date(exp.endDate);
    //     });   


    //     const result = await cloudinary.uploader.upload(file.path, {
    //         folder: 'pdfs' // Specify the folder in Cloudinary where you want to store PDFs
    //     });
    
    //     const pdfUrl = result.secure_url;
    //     console.log(pdfUrl);
    
        
    //     const data = {
    //         firstName, lastName, phoneNumber, address, education, experience, skills, resume: pdfUrl
    //     }
        
    //     console.log(data);
        
    //     const profile = await Profile.create(data);

    //     const user = await User.findByIdAndUpdate(req.userId, {profile: profile._id}, {new: true});
    //     res.status(200).json(profile);

    // } 

    res.json({ message: "Profile created successfully" });
}