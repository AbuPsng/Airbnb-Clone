const mongoose = require("mongoose")

exports.connectDb = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connect to database successfully with host ${response.connection.host}`)
    } catch (error) {
        console.log("Unable to connect the database")
    }
}