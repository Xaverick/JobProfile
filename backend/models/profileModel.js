const moongoose = require("mongoose");
const Schema = moongoose.Schema;


const profileSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },
    
    dateOfBirth: {
        type: Date,
        required: true
    },
    
    address: {
        type: String,
        required: true
    },

    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // },
    
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: "Category"
        }
    ],

    skills: {
        type: [String],
        required: true
    },

    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ],

    education: [
        {
            degree: {
                type: String,
                required: true
            },
            institution: {
                type: String,
                required: true
            },

            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ],

    resume: {
        originalName: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        }
    }
    
})


module.exports = moongoose.model("Profile", profileSchema)
