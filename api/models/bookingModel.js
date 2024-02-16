const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Places"
    },
    name: {
        type: String
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    price: {
        type: Number
    }
})

const bookingModel = mongoose.model("Bookings", bookingSchema)

module.exports = bookingModel