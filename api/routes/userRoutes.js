const express = require("express");
const { loginUser, logoutUser, profile, registerUser } = require("../controllers/userController.js");

const userRoutes = express.Router()

userRoutes.post("/register", registerUser)

userRoutes.post("/login", loginUser)

userRoutes.get("/profile", profile)

userRoutes.get("/logout", logoutUser)

module.exports = userRoutes;