const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword
}

exports.checkPassword = async (password, encryptedPassword) => {
    const correctPassword = await bcryptjs.compare(password, encryptedPassword)
    return correctPassword
}

exports.jwtToken = (email, id) => {
    const token = jwt.sign({ email, id }, process.env.JWT_TOKEN_SECRET, { expiresIn: "1d" })

    if (!token) throw new Error("Failed to generate JWT token")
    return token
}

