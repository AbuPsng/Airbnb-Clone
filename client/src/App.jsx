import HomePage from "./pages/HomePage"
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Layout from "./components/Layout"
import RegisterPage from "./pages/RegisterPage"
import axios from "axios"
import { UserContextProvider } from "./context/userContext/userContext"
import AccountPage from "./pages/AccountPage"
import PlacesPage from "./pages/PlacesPage"
import PlacesFormPage from "./pages/PlacesFormPage"
import SinglePlacePage from "./pages/SinglePlacePage"
import MyBookingsPage from "./pages/MyBookingsPage"
import MySingleBookingPage from "./pages/MySingleBookingPage"

axios.defaults.baseURL = "http://localhost:5000/api/v1"
axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/accounts" element={<AccountPage />} />
            <Route path="/accounts/places" element={<PlacesPage />} />
            <Route path="/accounts/places/new" element={<PlacesFormPage />} />
            <Route path="/accounts/places/:id" element={<PlacesFormPage />} />
            <Route path="/place/:id" element={<SinglePlacePage />} />
            <Route path="/accounts/my_bookings" element={<MyBookingsPage />} />
            <Route path="/accounts/my_bookings/:id" element={<MySingleBookingPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
