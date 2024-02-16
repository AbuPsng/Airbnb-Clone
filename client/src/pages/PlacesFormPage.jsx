import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhotosUploader from '../components/PhotosUploader'
import PerksContainer from '../components/PerksContainer'
import AccountNav from '../components/AccountNav'

const PlacesFormPage = () => {

    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState("")
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [maxGuests, setMaxGuests] = useState(1)
    const [price, setPrice] = useState(100)

    const { id } = useParams()

    const getSinglePlace = async () => {
        try {
            const response = await axios.get(`/place/get_single_place/${id}`)
            const data = response.data.place

            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        if (!id) return

        getSinglePlace()

    }, [id])

    const navigate = useNavigate()

    const preInput = (header, description) => {
        return (
            <>
                <h1 className="text-2xl mt-4">{header}</h1>
                <p className="text-gray-500 text-sm">{description}</p>
            </>
        )
    }

    const savePlace = async (e) => {
        e.preventDefault()
        const placeData = {
            title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
        }

        console.log(addedPhotos)
        try {
            if (id) {
                console.log(addedPhotos)

                await axios.put(`/place/update_place/${id}`, placeData)
                navigate("/accounts/places")
            } else {
                await axios.post("/place/create_place", placeData)
                navigate("/accounts/places")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>

                {preInput("Title", "Title for your place, should be short and catchy as in advertisement")}
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title for your place" />

                {preInput("Address", "Address to this place")}
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address" />

                {preInput("Photo", "more = better")}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput("Description", "Description of the place")}
                <textarea value={description} onChange={e => setDescription(e.target.value)} />

                {preInput("Perks", "Select all the perks")}
                <div className="gap-2 mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <PerksContainer selected={perks} onChange={setPerks} />
                </div>

                {preInput("Extra info", "house rules, etc")}
                <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />

                {preInput("Check in&out times, max guests", "Add check in and out times")}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in times</h3>
                        <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder="14.00" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out times</h3>
                        <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder="11" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} placeholder="max guests" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="max guests" />
                    </div>
                </div>

                <button className="primary my-4">Save</button>

            </form>
        </div>
    )
}

export default PlacesFormPage
