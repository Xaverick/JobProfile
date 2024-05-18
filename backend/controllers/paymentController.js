const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');
const crypto = require('crypto');
const profileModel = require('../models/profileModel');
const ExpressError = require('../utils/ExpressError.js');
const uploadOnCloudinary = require('../utils/cloudinary');


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  
module.exports.createOrder = async (req, res) => {

    let {amount} = req.body;

    amount = parseInt(amount);

    if(!amount) {
        throw new ExpressError("Amount is required", 400);
    }

    const result = await checkProfile(req); 

    if(!result) {
        throw new ExpressError("All fields are required", 400);
    }
    
    const options = {
    //   amount: amount * 100, // amount in smallest currency unit
      amount: amount * 1, // amount in smallest currency unit
      currency: 'INR',
      receipt: uuidv4(),
    };

    const order = await razorpay.orders.create(options);    
    res.json({order: order, file: req.file?.path});
};




const checkProfile = async(req) => {

    let { fullName, phoneNumber, education,  experience, specialization, 
        linkedIn, contactMethod, additionalInfo, referralSource, organization
    } = req.body;

    console.log(
        fullName, phoneNumber, education,  experience, specialization,
        linkedIn, contactMethod, additionalInfo, referralSource, organization
    );

    const resume = req.file?.path;

    console.log(resume);

    if(!fullName || !phoneNumber || !education || !experience || !specialization || 
        !linkedIn || !contactMethod || !additionalInfo || !referralSource || !organization
    ) return false;

    if(!resume) return false;

    return true;

}


const createProfile = async (profileData, userId, file) => {

    const { fullName, phoneNumber, education,  experience, specialization,
        linkedIn, contactMethod, additionalInfo, referralSource, organization
    } = profileData;

    const resumeLocalPath = file;

    if(!fullName || !phoneNumber || !education || !experience || !specialization ||
        !linkedIn || !contactMethod || !additionalInfo || !referralSource || !organization
    ) throw new ExpressError("All fields are required", 400);

    if(!resumeLocalPath) throw new ExpressError("Resume is required", 400);

    const resume = await uploadOnCloudinary(resumeLocalPath);
    if(!resume) throw new ExpressError("Upload failed", 400);
    console.log(resume.secure_url);


    const profile = new profileModel({
        fullName, phoneNumber, education,  experience, specialization,
        linkedIn, contactMethod, additionalInfo, referralSource, organization,
        resume: resume.secure_url,
        userId: userId
    });
    await profile.save();

    return profile;

}


module.exports.verify = async (req, res) => {
    const { response, plan, file, profileData } = req.body;
    console.log(file)
    const userId = req.userId;
    const user = await User.findById(userId);
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
  
    hmac.update(response.razorpay_order_id + "|" + response.razorpay_payment_id);
    const generated_signature = hmac.digest('hex');
  
    if (generated_signature === response.razorpay_signature) {
      user.paymentId = response.razorpay_payment_id;
      user.plan = plan.title;
      user.amount = plan.amount;
      const profile = await profileModel.findOne({ userId: userId });
      if (!profile) {
        const newProfile = await createProfile(profileData, userId, file);
        user.profile = newProfile._id;
        await user.save();

      }


      res.status(200).send('Payment verified successfully.');
    } else {
      res.status(400).send('Payment verification failed.');
    }
};
  