const multer = require("multer")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.split(" ").join(""))
    }
})

const multerUpload = multer({ storage })

module.exports = multerUpload