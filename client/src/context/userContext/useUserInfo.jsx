import { useContext } from "react"
import { UserContext } from "./userContext"

export const useUserInfo = () => {
    return useContext(UserContext)
}