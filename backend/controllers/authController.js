const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/userModel.js");
const passport = require('passport');
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
    clientID: "354301522470-2lj39ou02iqrvsvdjbk30ocpk10207rl.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  }
));

passport.serializeUser(function(user, callback) {
    callback(null, user._id);
});
  
passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
        callback(err, user);
    });
});



module.exports.googleCallback = async (req, res) => {
    console.log("\n******** Inside handleGoogleLoginCallback function ********");
    // console.log("User Google Info", req.user);
    let existingUser = await User.findOne({ email: req.user._json.email });

    if (existingUser) {
      if(!existingUser.googleId) {
        existingUser.googleId = req.user._json.sub;
        await existingUser.save();
      }
      const token = jwt.sign({ id: existingUser._id }, process.env.USER_SECRET, { expiresIn: '3h' });  
      res.cookie("userjwt", {token: token , expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000)}, { httpOnly: true, maxAge:3* 60 * 60 * 1000, secure: false, signed: true });
      return res.redirect(`http://localhost:5173/login`);
    }

    else{  

      console.log("Creating new Unregistered User");
      existingUser = await User.create({
        name: req.user._json.name,
        email: req.user._json.email,
        picture: req.user._json.picture,
        googleId: req.user._json.sub
      });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.USER_SECRET, { expiresIn: '3h' });
    res.cookie("userjwt", {token : token, expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000)}, { httpOnly: true, maxAge: 3* 60 * 60 * 1000, secure: false,  signed: true });
    return res.redirect("http://localhost:5173/login");

};

exports.getUserDetails = async (req, res) => {
    const user = await User.findById(req.userId);
    res.status(200).json({payload: user, expiresIn: req.expIn});
  
};

module.exports.logout = (req, res) => {
  res.clearCookie('userjwt');
  res.redirect('http://localhost:5173');
}