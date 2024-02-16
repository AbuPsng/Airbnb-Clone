const jwt = require("jsonwebtoken")

exports.isSignIn = async (req, res, next) => {
    const token = req.cookies["token"]

    if (!token) throw new Error("Token does not exist. Please login")

    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET,)
    req.user = decode
    next()
}