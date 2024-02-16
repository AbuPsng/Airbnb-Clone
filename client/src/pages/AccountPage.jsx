import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useUserInfo } from "../context/userContext/useUserInfo"
import axios from "axios"
import PlacesPage from "./PlacesPage"
import AccountNav from "../components/AccountNav"

const AccountPage = () => {

    const { user, setUser, ready } = useUserInfo()

    const { subPage } = useParams()

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axios.get("/user/logout")
            setUser({})
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    if (!ready) {
        return <div className="w-full text-center">
            <h1 className="text-3xl text-primary">Loading...</h1>
        </div>
    }

    if (ready && !user.name) {
        return <Navigate to="/login"></Navigate>
    }


    return (
        <div>

            <AccountNav />
            <div className="text-center max-w-lg mx-auto">
                Logged in as {user.name} ({user.email}) <br />
                <button onClick={handleLogout} className="primary max-w-sm mt-2">Logout</button>
            </div>
        </div>
    )
}

export default AccountPage
