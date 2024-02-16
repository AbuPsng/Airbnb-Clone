import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LinkContainer from '../components/LinkContainer'
import PlaceGallery from '../components/PlaceGallery'
import BookingDateContainer from '../components/BookingDateContainer'

const MySingleBookingPage = () => {

    const { id } = useParams()

    console.log(id)

    const [mySingleBooking, setMySingleBooking] = useState([])

    const getMyBooking = async () => {
        try {
            console.log("object")
            const response = await axios.get(`/bookings/my_bookings/${id}`)
            const data = response.data.place
            console.log(response)
            setMySingleBooking(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMyBooking()
    }, [])

    console.log(mySingleBooking)

    return (
        <div className='my-8'>
            <h1 className="text-3xl">{mySingleBooking?.place?.title}</h1>
            <LinkContainer className="my-2 block">
                {mySingleBooking?.place?.address}
            </LinkContainer>

            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information : </h2>
                    {
                        mySingleBooking?.place && (
                            <BookingDateContainer place={mySingleBooking} />
                        )
                    }
                </div>

                <div className='bg-primary text-white rounded-2xl p-6'>
                    <div>Total Price</div>
                    <div className='text-3xl '>₹ {mySingleBooking.price}</div>
                </div>

            </div>
            {
                mySingleBooking?.place && (
                    <PlaceGallery place={mySingleBooking.place} />
                )
            }
        </div>
    )
}

export default MySingleBookingPage
