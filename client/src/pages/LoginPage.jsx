import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserInfo } from "../context/userContext/useUserInfo"

const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const { setUser, setReady } = useUserInfo()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("/user/login", { email, password })
            setUser(response.data.user)
            setReady(true)
            alert("Login Successful !")
            navigate("/")
        } catch (error) {
            alert("Login Failed !")
            console.log(error)
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto " onSubmit={handleLogin}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your@gmail.com" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">Dont have an account yet?
                        <Link to="/register" className="underline text-black"> Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
