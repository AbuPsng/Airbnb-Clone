import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='flex flex-col min-h-screen py-4 px-8'>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout
