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
        type: String
    }, 

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        // required: true
    },

    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    plan: {
        type: String,

    },
    amount: {
        type: Number,
    },

    paymentId: {
        type: String
    },

});


module.exports = mongoose.model('User', userSchema);


