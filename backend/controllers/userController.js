const User = require("../models/userModel");
const ExpressError = require("../utils/ExpressError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const profileModel = require("../models/profileModel");
const uploadOnCloudinary = require('../utils/cloudinary');
const userPlanStatus = require('../models/userPlanStatus');
const Plans = require('../models/planModel');
const Invoices = require('../models/invoiceModel');
const fs = require('fs');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');


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
    // res.cookie('userjwt', {token : token, expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000)}, { signed: true, httpOnly: true, sameSite: 'none', maxAge: 1000 * 60 * 60 * 3, secure: true })
    res.cookie('userjwt', {token : token, expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000)}, { signed: true, maxAge: 1000 * 60 * 60 * 3, httpOnly: true});    
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        googleId: user.googleId,
        profile: user.profile,
        currentPlan: user.currentPlan,
        planNameL: user.planName
        
    }
    res.status(200).json({ payload, expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000)});
    
}


module.exports.logout = async (req, res) => {
    console.log("In Logout");
    res.clearCookie('userjwt', {
        signed: true,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
    res.status(200).json({ message: "Logged out successfully" });
}


module.exports.forgotPassword = async (req, res) => {
    console.log("In Forgot Password");
    const { email} = req.body;
    const user = await User.findOne({email: email});
    if(user){
        const secret = `${process.env.PASSWORD_SECRET}${user.password}`;
        const token = jwt.sign({ id: user._id } , secret , { expiresIn: '5m' });
        const link =  process.env.NODE_ENV === 'production' ? `${process.env.BACKEND_URL}/user/resetpassword/${user._id}/${token}` : `http://localhost:${process.env.PORT}/user/resetpassword/${user._id}/${token}`;
        let config = {
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.PASSWORD}`
            }
        };
        let transporter = nodemailer.createTransport(config);

        let MailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'MyApp',
                link: 'https://mailgen.js/'
            }

        });

        var response = {
            body: {
                name: user.name,
                intro: 'You have received this email because a password reset request for your account was received.',
                action: {
                    instructions: 'Click the button below to reset your password:',
                    button: {
                        color: '#DC4D2F',
                        text: 'Click here',
                        link: link
                    }
                },
                outro: 'If you did not request a password reset, no further action is required on your part.'
            }
        };

        var emailBody = MailGenerator.generate(response);
        let message = {
            from: `${process.env.EMAIL}`,
            to: `${email}`,
            subject: 'Password Reset Request',
            html: emailBody
        };
        
        console.log(link);
        transporter.sendMail(message)
        .then(() => res.status(201).json('email sent'))
        .catch((err) => res.status(400).json(err));
        
    } 
    else{
        res.status(400).json('email not registered');
    }
}


module.exports.resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    const oldUser = await User.findById(id);
    const redirectUrl = process.env.NODE_ENV === 'production' ? `${process.env.SITE_URL}/login` : 'http://localhost:5173/login';
    if(!oldUser){
        res.status(400).json('user not found');
    }
    else{
        const secret = `${process.env.PASSWORD_SECRET}${oldUser.password}`;
        if(jwt.verify(token,secret)){
            oldUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            await oldUser.save();
            res.render('successfulReset.ejs', {redirectUrl});
        }
        else{
            res.status(400).json('invalid token');
        }
    }

}


module.exports.contactUs = async (req, res) => {
    const { name, email, phoneNumber, message } = req.body;
    if (!name || !email || !message || !phoneNumber) {
        throw new ExpressError("All fields are required", 400);
    }

    let config = {
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.PASSWORD}`
        }
    };

    let transporter = nodemailer.createTransport(config); 

    const textMessage = `<p>Hello Admin,</p><p> <br> You have received a new query submission from the website. Here are the details:</p> <p> <br> Name: ${name}</p><p>Email: ${email}</p><p>Phone Number: ${phoneNumber}</p><p>Message: ${message}</p> <p> <br> <br> Please respond to the query as soon as possible.</p> <p> <br> Best regards,</p><p>Pinnacle Solutions</p><p>www.pinnacle.biz</p><p>Email: contact@pinnacle.biz</p>`;

    let body = {
        from: `${process.env.EMAIL}`,
        to: `${process.env.EMAIL}`,
        subject: `New Query Submission`,
        html: textMessage
    };

    transporter.sendMail(body)
    .then(() => console.log('Email sent successfully to admin'))
    .catch((err) => console.log(err));

    const userTextMessage = `<p>Dear ${name},</p><p> <br> Thank you for contacting us. <br> <br> We have received your query and will get back to you as soon as possible.</p> <p><br> We appreciate your patience and will strive to respond within 24-48 hours. If your inquiry is
urgent, please contact us directly at 844-7777-213 or contact@pinnacle.biz. Thank you again
for reaching out to us.</p> <p> <br> Best regards,</p><p>Pinnacle Solutions</p><p>www.pinnacle.biz</p><p>Email:contact@pinnacle.biz</p>`;

    body = {
        from: `${process.env.EMAIL}`,
        to: `${email}`,
        subject: `Thank you for Your Query`,
        html: userTextMessage
    };

    transporter.sendMail(body)
    .then(() => console.log('Email sent successfully to user'))
    .catch((err) => console.log(err));


    res.status(200).json({ message: "Message sent successfully" });
    
}

module.exports.createProfile = async (req, res) => {
    const profileCheck = await profileModel.findOne({ userId: req.userId });
    if (profileCheck ) {
        if (req.file?.path) fs.unlinkSync(req.file?.path);
        throw new ExpressError("Profile already exists", 400);
    }

    let { fullName, phoneNumber, education, experience, specialization,
         linkedIn, contactMethod, additionalInfo, referralSource, organization } = req.body;

    if (!fullName || !phoneNumber || !education || !experience || !specialization || 
        !contactMethod || !organization) {
            if (req.file?.path) fs.unlinkSync(req.file?.path);
            throw new ExpressError("All mandatory fields are required", 400);
    }

    let resume = req.file?.path;

    if (resume) {
        resume = await uploadOnCloudinary(resume);        
        resume = resume.secure_url;
    }


    const newProfile = new profileModel({
        userId: req.userId,
        fullName,
        phoneNumber,
        education,
        experience,
        specialization,
        linkedIn,  // This will be undefined if not provided
        contactMethod,
        additionalInfo,
        referralSource,
        organization,
        resume  // This will be undefined if not provided
    });

    await newProfile.save();

    const user = await User.findById(req.userId);
    user.profile = newProfile._id;
    await user.save();

    res.status(200).json({ message: "Profile created successfully", user: user });  

}


module.exports.updateProfile = async (req, res) => {
    const profile = await profileModel.findOne({ userId: req.userId });

    if (!profile) {
        fs.unlinkSync(req.file?.path);
        throw new ExpressError("Profile not found", 400);
    }

    let { fullName, phoneNumber, education, experience, specialization,
         linkedIn, contactMethod, additionalInfo, referralSource, organization } = req.body;

    if (!fullName || !phoneNumber || !education || !experience || !specialization || 
        !contactMethod || !organization) {
            fs.unlinkSync(req.file?.path);
            throw new ExpressError("All mandatory fields are required", 400);
    }

    let resume = req.file?.path;

    if (resume) {
        resume = await uploadOnCloudinary(resume);        
        resume = resume.secure_url;
    }

    profile.fullName = fullName;
    profile.phoneNumber = phoneNumber;
    profile.education = education;
    profile.experience = experience;
    profile.specialization = specialization;
    profile.linkedIn = linkedIn;
    profile.contactMethod = contactMethod;
    profile.additionalInfo = additionalInfo;
    profile.referralSource = referralSource;
    profile.organization = organization;
    profile.resume = resume;
    await profile.save();
    res.status(200).json({ message: "Profile created successfully"});  

}


module.exports.getUser = async (req, res) => {
    const user = await User.findById(req.userId);
    res.status(200).json(user);
}

module.exports.getUserProfile = async (req, res) => {
    const profile = await profileModel.findOne({userId: req.userId});
    res.status(200).json(profile);
}

module.exports.getPlans = async (req, res) => {
    const plans = await Plans.find();
    res.status(200).json(plans);
}


module.exports.getCurrentPlan = async (req, res) => {
    const user = await User.findById(req.userId);
    let plans = [];
    for(let i=0; i<user.currentPlan.length; i++){
        let plan = await userPlanStatus.findById(user.currentPlan[i]);
        plans.push(plan);
    }
    console.log(plans);
    res.status(200).json(plans);
}


module.exports.getOrderHistory = async (req, res) => {
    console.log("In Order History");
    const orders = await Invoices.find({user: req.userId});
    res.status(200).json(orders);
}