const moongoose = require("mongoose");
const Schema = moongoose.Schema;
const User = require("./userModel");


const profileSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    experience: {
        type: String,
        required: true
    },

    specialization: {
        type: String,
        required: true
    },

    education: {
        type: String,
        required: true
    },

    resume: {
        type: String,
    },

    linkedIn: {
        type: String,
    },

    organization: {
        type: String,
        required: true
    },
    
    contactMethod: {
        type: String,
        required: true
    },
    
    additionalInfo: {
        type: String,
    },

    referralSource: {
        type: String,
    }

    
})


module.exports = moongoose.model("Profile", profileSchema)
