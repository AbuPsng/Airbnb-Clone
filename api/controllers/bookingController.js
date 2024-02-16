const bookingModel = require("../models/bookingModel")

exports.bookingPlace = async (req, res) => {

    const user = req.user.id

    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body

    if (!place || !user || !checkIn || !checkOut || !numberOfGuests || !name || !phone || !price) throw new Error("Please provide all the fields")

    const bookedPlace = await bookingModel.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, price, user
    })

    res.status(201).json({
        message: "Your booking is successful",
        place: bookedPlace
    })
}

exports.getMyBookings = async (req, res) => {
    try {
        const userId = req.user.id
        const myBooking = await bookingModel.find({ user: userId }).populate("place")

        if (myBooking.length === 0) return res.status(200).json("No booking founds")

        res.status(200).json({
            message: "Your bookings",
            place: myBooking
        })

    } catch (error) {
        console.log(error)
    }
}

exports.getMySingleBooking = async (req, res) => {
    try {
        const userId = req.user.id
        const bookingId = req.params.id

        console.log(bookingId)

        const mySingleBooking = await bookingModel.findById(bookingId).populate("place")


        if (userId !== mySingleBooking.user.toString()) throw new Error("You are not authorized")

        console.log(mySingleBooking)

        res.status(200).json({
            message: "Your current booking",
            place: mySingleBooking
        })
    } catch (error) {
        console.log(error)
    }
}