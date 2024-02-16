import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({ children }) {

    const [user, setUser] = useState({})

    const [ready, setReady] = useState(false)

    const handleCheck = async () => {
        try {
            const { data } = await axios.get("/user/profile")
            setUser(data.user)
            setReady(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleCheck()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, ready, setReady }}>
            {children}
        </UserContext.Provider>
    )
}