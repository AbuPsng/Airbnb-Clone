import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingContainer from "../components/BookingContainer"
import PlaceGallery from "../components/PlaceGallery"
import LinkContainer from "../components/LinkContainer"

const SinglePlacePage = () => {

    const { id } = useParams()

    const [place, setPlace] = useState({})

    const getSinglePlace = async () => {
        try {
            const response = await axios.get(`place/get_single_place/${id}`)
            const data = response.data.place
            setPlace(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!id) return
        getSinglePlace()
    }, [id])


    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl ">{place?.title}</h1>
            <LinkContainer>
                {place.address}
            </LinkContainer>

            <PlaceGallery place={place} />

            <div className="mt-8 mb-8 grid gap-8 grid-col-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>

                    Check-in : {place.checkIn}<br />
                    Check-out : {place.checkOut}<br />
                    Max number of guests: {place.maxGuests}
                </div>

                <div>
                    <BookingContainer place={place} />
                </div>

            </div>

            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className="font-semibold text-2x">Extra Info</h2>
                </div>

                <div className="mt-2 mb-4 text-sm text-gray-700 leading-5">
                    {place.extraInfo}
                </div>
            </div>

        </div >
    )
}

export default SinglePlacePage
