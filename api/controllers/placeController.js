const download = require('image-downloader');
const { dirname, join } = require('path');
const placeModel = require('../models/placeModel');

exports.imageUploadedLink = async (req, res) => {
    try {
        const { link } = req.body

        const newPhotoName = "image" + Date.now() + ".jpg"
        const destination = dirname(__dirname)

        await download.image({
            url: link,
            dest: destination + "/uploads/" + newPhotoName
        })
        res.status(201).json({
            message: "Message successfully uploaded",
            link: newPhotoName
        })
    } catch (error) {
        console.log(error)
    }
}

exports.uploadPhotos = async (req, res) => {
    try {
        const files = req.files

        let link = [];

        files.map(file => link.push(file.filename))

        res.json({ link })

    } catch (error) {
        console.log(error)
    }
}

exports.getAllPlaces = async (req, res) => {
    try {
        const allPlaces = await placeModel.find({}).select("title photos description _id address price")

        if (allPlaces.length < 1) throw new Error("No Places available")

        res.status(200).json({
            message: "All places",
            place: allPlaces
        })
    } catch (error) {
        console.log(error)
    }
}

exports.createPlace = async (req, res) => {
    try {
        const userId = req.user.id

        const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body

        if (!title || !address || !addedPhotos || !description || !perks || !extraInfo || !checkIn || !checkOut || !maxGuests || !price) {
            throw new Error("Please provide all the fields")
        }

        const place = await placeModel.create({ owner: userId, title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price })

        res.status(201).json({
            message: "Places created successfully",
            place
        })

    } catch (error) {
        console.log(error)
    }
}

exports.getUserPlaces = async (req, res) => {
    try {
        const userId = req.user.id

        const allUserPlaces = await placeModel.find({ owner: userId })

        res.status(200).json({
            message: "All User Bookings",
            allPlaces: allUserPlaces
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getSinglePlace = async (req, res) => {
    try {
        const placeId = req.params.id;

        const place = await placeModel.findById(placeId)

        if (!place) throw new Error("No place found with this id")

        res.status(201).json({ message: "Single Place", place })
    } catch (error) {
        console.log(error)
    }
}

exports.updatePlace = async (req, res) => {
    try {
        const userId = req.user.id

        const placeId = req.params.placeId

        const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body

        if (!title || !address || !addedPhotos || !description || !perks || !extraInfo || !checkIn || !checkOut || !maxGuests || !price) {
            throw new Error("Please provide all the fields")
        }

        const place = await placeModel.findById(placeId)

        if (userId !== place.owner.toString()) throw new Error("You are not authorized")

        const updatedPlace = await placeModel.findByIdAndUpdate(placeId, { title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price }, { new: true })

        res.status(200).json({
            message: "Place successfully updated",
            place: updatedPlace
        })
    } catch (error) {
        console.log(error)
    }
}