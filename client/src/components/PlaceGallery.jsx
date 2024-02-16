import { useState } from "react"

const PlaceGallery = ({ place }) => {

    const [showAllPhotos, setShowAllPhotos] = useState(false)

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white  min-h-screen">
                <div className="p-8 grid gap-4 bg-black">
                    <div>
                        <h2 className="text-3xl mr-38">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed flex items-center right-12 top-8 gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    {
                        place.photos?.map(link => (
                            <img key={link} className="aspect-square object-cover" src={`http://localhost:5000/uploads/${link}`} alt={`${place?.title}-images`} />
                        ))
                    }
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div>
                    {
                        place.photos?.[0] && (
                            <div >
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={`http://localhost:5000/uploads/${place.photos[0]}`} alt={`${place?.title}-images`} />
                            </div>
                        )
                    }
                </div>
                <div className="grid">
                    {
                        place.photos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer  aspect-square object-cover" src={`http://localhost:5000/uploads/${place.photos[1]}`} alt={`${place?.title}-images`} />

                        )
                    }
                    <div className="overflow-hidden">
                        {
                            place.photos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer  aspect-square object-cover overflow-hidden" src={`http://localhost:5000/uploads/${place.photos[2]}`} alt={`${place?.title}-images`} />
                            )
                        }
                    </div>
                </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-0 right-0 py-2 px-4 bg-white rounded-2xl  shadow-md shadow-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                Show more photos
            </button>
        </div>
    )
}

export default PlaceGallery
