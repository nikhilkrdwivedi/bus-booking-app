import Header from '@components/headers/Header'
import Booking from '@pages/private/Booking'
import Home from '@pages/private/Home'
import Providers from '@pages/private/Providers'
import TripPlan from '@pages/private/TripPlan'
import VehicleConfig from '@pages/private/VehicleConfig'
import Vechicles from '@pages/private/Vehicles'
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
            <Route path='/vehicle' element={<Vechicles />} />
            <Route path='/vehicle-config' element={<VehicleConfig />} />
            <Route path='/providers' element={<Providers />} />
            {/* <Route path='/get-started' element={<GetStarted />} /> */}
        </Routes></>

    )
}
