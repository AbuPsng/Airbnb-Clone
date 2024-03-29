import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const HomePage = () => {

    const [places, setPlaces] = useState([])

    const getAllPlaces = async () => {
        try {
            const response = await axios.get('/place/get_all_places')
            const data = response.data.place
            setPlaces(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllPlaces()
    }, [])

    return (
        <div className="mt-8 gap-y-8 gap-x-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                places.length > 0 && places.map(place => (
                    <Link key={place._id} to={`/place/${place._id}`} >
                        <div className="bg-gray-500 mb-2 rounded-2xl flex">
                            {
                                place.photos?.[0] && (
                                    <img className="rounded-2xl object-cover aspect-square" src={`http://localhost:5000/uploads/${place.photos[0]}`} alt={`${place.title}-image`} />
                                )
                            }
                        </div>
                        <h2 className="font-bold">{place.address}</h2>
                        <h3 className="text-sm text-gray-500 ">{place.title}</h3>
                        <div className="mt-1">
                            <span className="font-bold">₹{place.price}</span> per night
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default HomePage
