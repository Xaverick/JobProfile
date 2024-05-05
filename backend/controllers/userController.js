const User = require("../models/userModel");
const ExpressError = require("../utils/ExpressError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



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
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new ExpressError("Invalid credentials", 400);
    }
    const token = jwt.sign({ id: user._id }, process.env.USER_SECRET, { expiresIn: '3h'});
    res.cookie('userjwt', token, { signed: true, httpOnly: true, sameSite: 'none', maxAge: 1000 * 60 * 60 * 3, secure: true })
    const payload = { userId: user._id, email: user.email, username: user.username };
    res.status(200).json({ payload, expiresIn: 1000 * 60 * 60 *3});
    
}


module.exports.logout = async (req, res) => {
    console.log("In Logout");
    res.clearCookie('userjwt');
    res.status(200).json({ message: "Logged out successfully" });
}