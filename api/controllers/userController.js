const userModel = require('../models/userModel.js');
const { checkPassword, hashPassword, jwtToken } = require('../utils/utils.js');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const hashedPassword = await hashPassword(password)

        const existUser = await userModel.findOne({ email })

        if (existUser) throw new Error("User already exist")

        const user = await userModel.create({ name, email, password: hashedPassword })

        res.status(201).json({
            message: "Created an account successfully",
            success: true,
            user
        })
    } catch (error) {
        console.log(error)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const existUser = await userModel.findOne({ email })

        if (!existUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const correctPassword = await checkPassword(password, existUser.password)

        if (!correctPassword) {
            return res.status(401).json({ message: "Wrong password", success: false });
        }

        const token = await jwtToken(email, existUser._id)

        existUser.password = undefined

        res.cookie("token", token, {
            sameSite: "lax",
            secure: false
        }).status(201).json({
            message: "Login successfully",
            success: true,
            user: existUser
        })
    } catch (error) {
        console.log(error)
    }
}

exports.profile = async (req, res) => {
    try {
        const { token } = req.cookies

        if (token) {
            jwt.verify(token, process.env.JWT_TOKEN_SECRET, {}, async (err, user) => {
                try {
                    if (err) throw err.message;
                    const currentUser = await userModel.findById(user.id)
                    currentUser.password = undefined
                    res.json({ user: currentUser })
                } catch (error) {
                    console.log(error)
                }
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

exports.logoutUser = async (req, res) => {
    try {
        res.cookie("token", "pineapple", {
            expiresIn: "10s"
        }).json({ message: "Logout successfully" })
    } catch (error) {
        console.log(error)
    }
}