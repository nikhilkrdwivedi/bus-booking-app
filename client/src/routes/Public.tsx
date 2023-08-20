import Header from '@components/headers/Header'
import Booking from '@pages/private/Booking'
import Home from '@pages/public/Home'
import GetStarted from '@pages/public/GetStarted'

import { Outlet, Route, Routes } from 'react-router-dom'

export default function Public() {
    return (
        <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/get-started' element={<GetStarted />} />
        </Routes></>

    )
}
