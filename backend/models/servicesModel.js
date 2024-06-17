const moongoose = require("mongoose");
const Schema = moongoose.Schema;


const serviceSchema = new Schema({
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
})


module.exports = moongoose.model("Service", serviceSchema)