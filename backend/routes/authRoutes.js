const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const {isUser} = require ('../middleware');
const catchAsync = require('../utils/catchAsync');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google',  { 
    scope: ['profile', 'email'],
    failureRedirect: `${process.env.SITE_URL}/login`,
    session: false
}, ), catchAsync(authController.googleCallback));


router.get('/getDetails', isUser, catchAsync(authController.getUserDetails));

// router.get('/redirect', authController.redirectToFrontend);
router.get('/logout', authController.logout);


module.exports = router;


