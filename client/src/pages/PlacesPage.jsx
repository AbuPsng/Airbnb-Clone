import { Link } from "react-router-dom"
import AccountNav from "../components/AccountNav"
import { useEffect, useState } from "react"
import axios from "axios"
import PlaceImg from "../components/PlaceImg"

const PlacesPage = () => {

    const [places, setPlaces] = useState([])


    const getAllPlaces = async () => {
        try {
            const response = await axios.get("/place/get_user_places")
            setPlaces(response.data.allPlaces)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllPlaces()
    }, [])

    return (
        <div>

            <AccountNav />
            <div className="text-center">
                <Link className="bg-primary text-white py-2 px-6 rounded-full" to="/accounts/places/new">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline-flex gap-1 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new places
                </Link>
            </div>
            {
                places.length > 0 && places.map(place => (
                    <Link key={place.title} to={`/accounts/places/${place._id}`} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl " >
                        <div className="flex w-32 h-32 rounded-lg bg-gray-300 grow shrink-0">
                            <PlaceImg className={"object-cover"} index={0} place={place} />
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl font-semibold">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                )
                )
            }
        </div>
    )
}

export default PlacesPage
