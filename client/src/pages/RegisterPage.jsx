import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const RegisterPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("/user/register", {
                email, name, password
            })
            alert("Registration Successful! ")
            console.log(response)
        } catch (error) {
            alert("Registration Failed! Please try again later ")
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto " onSubmit={handleRegister}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Username" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your@gmail.com" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">Already have an account ?
                        <Link to="/login" className="underline text-black"> Login now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
