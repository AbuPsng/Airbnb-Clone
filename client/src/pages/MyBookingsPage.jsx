import { useEffect, useState } from 'react'
import { differenceInCalendarDays, format } from "date-fns"
import AccountNav from '../components/AccountNav'
import axios from 'axios'
import PlaceImg from '../components/PlaceImg'
import { Link } from 'react-router-dom'
import BookingDateContainer from '../components/BookingDateContainer'

const MyBookingsPage = () => {

    const [myBookings, setMyBookings] = useState([])

    const getMyBooking = async () => {
        try {
            const response = await axios.get("/bookings/my_bookings")
            const data = response.data.place
            setMyBookings(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMyBooking()
    }, [])

    return (
        <div>
            <AccountNav />
            <div>
                {
                    myBookings?.length > 0 && myBookings.map(place => (
                        <Link to={`/accounts/my_bookings/${place._id}`} key={place._id} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'>

                            <div className='w-48 '>
                                <PlaceImg place={place.place} />
                            </div>

                            <div className='py-3 pr-3 grow'>
                                <h2 className='text-xl'>{place.place.title}</h2>

                                <div className='text-xl'>

                                    <BookingDateContainer place={place} className={"mt-4 mb-2 text-gray-500"} />

                                    <div className="flex gap-1 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                        </svg>

                                        <span className="text-2xl">
                                            Total price : ₹ {place.price}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default MyBookingsPage
