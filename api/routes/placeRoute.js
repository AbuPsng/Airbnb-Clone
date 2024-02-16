const express = require("express");
const { imageUploadedLink, uploadPhotos, createPlace, getAllPlaces, getSinglePlace, updatePlace, getUserPlaces } = require("../controllers/placeController.js");
const multerUpload = require("../utils/multer.js");
const { isSignIn } = require("../utils/isSignIn.js");

const placeRoutes = express.Router()

placeRoutes.post("/image_uploaded_by_link", imageUploadedLink)

placeRoutes.post("/uploads_photo", multerUpload.array("photos", 100), uploadPhotos)

placeRoutes.post("/create_place", isSignIn, createPlace)

placeRoutes.get("/get_all_places", getAllPlaces)

placeRoutes.get("/get_user_places", isSignIn, getUserPlaces)

placeRoutes.get("/get_single_place/:id", isSignIn, getSinglePlace)

placeRoutes.put("/update_place/:placeId", isSignIn, updatePlace)

module.exports = placeRoutes

