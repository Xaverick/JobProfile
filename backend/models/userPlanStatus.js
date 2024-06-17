// const moongose = require("mongoose");
// const Schema = moongose.Schema;


// // Define the Service and ReedeemHistory schemas
// const ServiceSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: String,
//     calls: {
//         type: Number,
//         default: 0
//     }
// });

// const RedeemHistorySchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     notes: {
//         type: String,
//         default: ""
//     },
    
//     calls: {
//         type: Number,
//         required: true
//     }
// });

// // Define the Plan schema
// const PlanSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     validity: {
//         type: Number,
//         required: true
//     },
//     services: [
//         {
//             service: ServiceSchema,
//             maxCalls: {
//                 type: Number,
//                 default: 0
//             }
//         }
//     ],
//     redeemHistory: [RedeemHistorySchema],

//     expiryDate: {
//         type: Date,
//         default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
//     }
// });


// // Define the UserPlanStatus schema
// const userPlanStatusSchema = new Schema({
//     userId: {
//         type: Schema.Types.ObjectId,
//         ref: "User"
//     },
//     plan: PlanSchema
// });


// module.exports = moongose.model("UserPlanStatus", userPlanStatusSchema)


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Service and RedeemHistory schemas
const ServiceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    calls: {
        type: Number,
        default: 0
    }
});

const RedeemHistorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        default: ""
    },
    calls: {
        type: Number,
        required: true
    }
});

// Define the Plan schema
const PlanSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    validity: {
        type: Number,
        required: true
    },
    services: [
        {
            service: ServiceSchema,
            maxCalls: {
                type: Number,
                default: 0
            }
        }
    ],
    redeemHistory: [RedeemHistorySchema],
});

// Define the UserPlanStatus schema
const userPlanStatusSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    plan: {
        type: PlanSchema,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model("UserPlanStatus", userPlanStatusSchema);

