import { useEffect, useState } from "react"
import { differenceInCalendarDays } from "date-fns"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useUserInfo } from "../context/userContext/useUserInfo"

const BookingContainer = ({ place }) => {

    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    const { user } = useUserInfo()

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setName(user.name)
        }
    }, [user])

    useEffect(() => {
        // Get the current date
        const currentDate = new Date();

        // Format the current date as YYYY-MM-DD
        const formattedDate = currentDate.toISOString().slice(0, 10);

        // Set the formatted date as the default value
        setCheckIn(formattedDate);
    }, []);

    let numberOfNights = 0

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    const handleBooking = async () => {
        const data = { checkIn, checkOut, numberOfGuests, name, phone, place: place._id, price: (numberOfNights * place.price) }
        try {
            const response = await axios.post("/bookings/create", data)
            const bookingId = response.data.place._id
            navigate(`/accounts/my_bookings/${bookingId}`)
            setCheckIn("")
            setCheckOut("")
            setNumberOfGuests(1)
            setName("")
            setPhone("")
            numberOfNights = 0
        } catch (error) {
            console.log(error)
        }
    }

    console.log(checkIn)

    return (
        <div>
            <div className="bg-white shadow p-4 rounded-2xl">
                <div className="text-2xl text-center">
                    Price : ₹ {place.price} / per night
                </div>

                <div className="border rounded-2xl mt-4">

                    <div className="flex justify-center">

                        <div className="py-3 px-4 flex flex-col w-1/2">
                            <label>Check in : </label>
                            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                        </div>

                        <div className="py-3 px-4 border-l flex flex-col w-1/2">
                            <label>Check out : </label>
                            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                        </div>
                    </div>

                    <div className="py-3 px-4 border-t ">
                        <label>Number of guests : </label>
                        <input type="number" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} />
                    </div>

                </div>

                {
                    numberOfNights > 0 && (
                        <div className="py-3 px-4 border-t ">
                            <label>Your Full Name :</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            <label>Phone Number :</label>
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    )
                }

                <button onClick={handleBooking} className="primary mt-4">
                    Book this place
                    {
                        numberOfNights > 0 && (
                            <span>
                                ₹ {(numberOfNights * place.price)}
                            </span>
                        )
                    }
                </button>
            </div>
        </div>
    )
}

export default BookingContainer
