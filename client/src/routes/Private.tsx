import Header from '@components/headers/Header'
import Booking from '@pages/private/Booking'
import Home from '@pages/private/Home'
import Providers from '@pages/private/Providers'
import TripPlan from '@pages/private/TripPlan'
import Vehicle from '@pages/private/Vehicle'
import GetStarted from '@pages/public/GetStarted'

import { Outlet, Route, Routes } from 'react-router-dom'

export default function Private() {
    return (

   
        <><Header />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/booking' element={<Booking />} />
            <Route path='/trip-plan' element={<TripPlan />} />
            <Route path='/vehicle-config' element={<Vehicle />} />
            <Route path='/providers' element={<Providers />} />
            {/* <Route path='/get-started' element={<GetStarted />} /> */}
        </Routes></>

    )
}
