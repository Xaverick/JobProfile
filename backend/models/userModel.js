const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    googleId: {
        type: String
    },

    picture: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

    }, 

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        // required: true
    },

    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    
    currentPlan: [
        {
            type: Schema.Types.ObjectId,
            ref: 'userPlanStatus'
        }
    ],



});



module.exports = mongoose.model('User', userSchema);
