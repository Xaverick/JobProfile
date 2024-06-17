const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Service = {
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    calls: {
        type: Number,
        default: 0
    }
}


const planSchema = new Schema({

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
            service: Service,
            maxCalls: {
                type: Number,
                default: 0
            }
        }
    ]
})


module.exports = mongoose.model("Plan", planSchema)



