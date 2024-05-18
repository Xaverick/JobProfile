// const moongoose = require("mongoose");
// const Schema = moongoose.Schema;


// const profileSchema = new Schema({
//     firstName: {
//         type: String,
//         required: true
//     },

//     email: {
//         type: String,
//         required: true
//     },

//     phone: {
//         type: String,
//         required: true
//     },
    
//     dateOfBirth: {
//         type: Date,
//         required: true
//     },
    
//     address: {
//         type: String,
//         required: true
//     },

//     categories: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: "Category"
//         }
//     ],

//     skills: {
//         type: [String],
//         required: true
//     },

//     experience: [
//         {
//             title: {
//                 type: String,
//                 required: true
//             },
//             company: {
//                 type: String,
//                 required: true
//             },
//             startDate: {
//                 type: Date,
//                 required: true
//             },
//             endDate: {
//                 type: Date,
//                 required: true
//             },
//             description: {
//                 type: String,
//                 required: true
//             }
//         }
//     ],

//     education: [
//         {
//             degree: {
//                 type: String,
//                 required: true
//             },
//             institution: {
//                 type: String,
//                 required: true
//             },

//             startDate: {
//                 type: Date,
//                 required: true
//             },
//             endDate: {
//                 type: Date,
//                 required: true
//             },
//             description: {
//                 type: String,
//                 required: true
//             }
//         }
//     ],

//     resume: {
//         originalName: {
//             type: String,
//             required: true
//         },
//         path: {
//             type: String,
//             required: true
//         }
//     }
    
// })


// module.exports = moongoose.model("Profile", profileSchema)

// phoneNumber: '',
// specialization: '',
// resume: '',
// experience: '',
// education: '',
// organization: '',
// contactMethod: '',
// additionalInfo: '',
// referralSource: '',
// email: '',
// fullName: ''


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
        required: true
    },

    linkedIn: {
        type: String,
        required: true
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
