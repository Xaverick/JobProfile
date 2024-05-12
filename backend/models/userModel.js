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

    photo: String, 

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

    likededIn: {
        type: String
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    
});


module.exports = mongoose.model('User', userSchema);


