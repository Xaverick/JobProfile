const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },

    plan: { 
        type: String, 
        required: true 
    },
    
    amount: { 
        type: Number, 
        required: true 
    },

    paymentId: { 
        type: String, 
        required: true 
    },

    purchaseDate: { 
        type: Date,
        default: Date.now 
    },

    expiryDate: { 
        type: Date, 
        required: true 
    },

    orderId: { 
        type: String, 
        required: true 
    },


});

module.exports = mongoose.model("Invoice", invoiceSchema);
