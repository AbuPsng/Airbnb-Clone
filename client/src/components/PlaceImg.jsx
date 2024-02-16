
const PlaceImg = ({ place, index = 0, className = "object-cover" }) => {

    if (place.photo?.length) {
        return ""
    }

    // if (!className) {
    //     className = "object-cover"
    // }
    return (
        <img className={className} src={`http://localhost:5000/uploads/${place.photos[index]}`} alt="" />
    )
}

export default PlaceImg
