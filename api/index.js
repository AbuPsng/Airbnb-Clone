const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDb } = require("./config/dbConfig.js");
const userRoutes = require("./routes/userRoutes.js");
const cookieParser = require("cookie-parser");
const placeRoutes = require("./routes/placeRoute.js");
const bookingRoutes = require("./routes/bookingRoutes.js");


dotenv.config()

const app = express()

//*CONNECTING TO DATABASE
connectDb()

//*GLOBAL MIDDLEWARE

app.use("/uploads", express.static("uploads"))
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(cookieParser())

//*ROUTES
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/place", placeRoutes)
app.use("/api/v1/bookings", bookingRoutes)

app.listen(process.env.PORT, () => {
    console.log(`App is running of port ${process.env.PORT}`)
})