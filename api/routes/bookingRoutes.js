const express = require("express");
const { bookingPlace, getMyBookings, getMySingleBooking } = require("../controllers/bookingController");
const { isSignIn } = require("../utils/isSignIn");

const bookingRoutes = express.Router()

bookingRoutes.post("/create", isSignIn, bookingPlace)

bookingRoutes.get("/my_bookings", isSignIn, getMyBookings)

bookingRoutes.get("/my_bookings/:id", isSignIn, getMySingleBooking)

module.exports = bookingRoutes;