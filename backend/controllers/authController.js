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
    const redirectUrl = process.env.NODE_ENV === 'production' ? `${process.env.SITE_URL}/login` : 'http://localhost:5173/login';
    if (existingUser) {
      if(!existingUser.googleId) {
        existingUser.googleId = req.user._json.sub;
        existingUser.picture = req.user._json.picture;
        await existingUser.save();
      }
      const token = jwt.sign({ id: existingUser._id }, process.env.USER_SECRET, { expiresIn: '3h' });  
      res.cookie("userjwt", {token: token , expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000)}, { httpOnly: true, maxAge:3* 60 * 60 * 1000, secure: true, signed: true, sameSite: 'none' });
      return res.redirect(redirectUrl);
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
    res.cookie("userjwt", {token : token, expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000)}, { httpOnly: true, maxAge: 3* 60 * 60 * 1000, secure: true,  signed: true, sameSite: 'none' });
    return res.redirect(redirectUrl);

};

exports.getUserDetails = async (req, res) => {
    const user = await User.findById(req.userId);
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
    res.status(200).json({payload: payload, expiresIn: req.expIn});
  
};

module.exports.logout = (req, res) => {
  res.clearCookie('userjwt', {
    signed: true,
    httpOnly: true,
    sameSite: 'none',
    secure: true
  });
  const redirectUrl = process.env.NODE_ENV === 'production' ? `${process.env.SITE_URL}/login` : 'http://localhost:5173/login';
  res.redirect(redirectUrl);
}