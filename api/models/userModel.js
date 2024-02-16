const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a Name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide a Email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a Password"],
    },
})

const userModel = mongoose.model("Users", userSchema)
module.exports = userModel