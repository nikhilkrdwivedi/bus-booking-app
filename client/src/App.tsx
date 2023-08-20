
import Container from '@components/containers/Container'
import './App.css'
import moment from 'moment'
import { TbArmchair } from 'react-icons/tb'
import { FaRupeeSign } from 'react-icons/fa'
import { GiSteeringWheel } from 'react-icons/gi'
import { BiBus } from 'react-icons/bi'
import { FiMapPin } from 'react-icons/fi'
import { MdOutlineDepartureBoard } from 'react-icons/md'
import { useState } from 'react'
import { BUS_SEATING_SEAT_TYPES } from '@data/static/seatTypes'
import Card from '@components/cards/Card'
import Header from '@components/headers/Header'
import Button from '@elements/Button'
import { BUS_SEATING_SEATS,BUS_SLEEPER_SEATS } from '@data/static/busSeats'
import SeatingSeat from '@components/seats/SeatingSeat'
import SleeperSeat from '@components/seats/SleeperSeat'
import { BUS_DETAILS } from '@data/static/busDetails'
import Home from '@pages/private/Home'
import { Route, Routes, BrowserRouter as Router, Outlet, } from 'react-router-dom'
import Booking from '@pages/private/Booking'
import Private from '@routes/Private'
import Public from '@routes/Public'
import { useAuth } from '@contexts/AuthContext'
function App() {
  const { isAuthenticated } = useAuth();
  const [seat, setSeat] = useState(BUS_SLEEPER_SEATS);
  const [selectedSeats, setSelectSeats] = useState([]);
  // const [isAuthenticated, setIsAuthenticate] = useState(false)
  const getSeat = (col: string) => {

    switch (col) {
      case 'A':
        return <TbArmchair className="w-8 h-12 text-green-400 fill-green-200 cursor-pointer" />
      case 'B':
        return <TbArmchair className="w-8 h-12 text-red-400 fill-red-200 cursor-not-allowed" />
      case 'S':
        return <TbArmchair className="w-8 h-12 text-sky-400 fill-sky-200 cursor-pointer" />
      case 'R':
        return <TbArmchair className="w-8 h-12 text-gray-400 fill-gray-200 cursor-not-allowed" />

      default:
        return <div className="w-8 h-12" />
    }

  }
  const updateSeat = (selectedSeat: string, rowIndex: number, colIndex: number) => {
    const action = selectedSeat === 'A' ? 'S' : 'A';
    console.log({ selectedSeat, rowIndex, colIndex })
    const _seat = JSON.parse(JSON.stringify(seat));
    console.log({ _seat,action })
    _seat[rowIndex][colIndex]['bookingStatus'] = action
    setSeat(_seat)
  }
  return (
    <>
    {isAuthenticated ? 
    <Private />:
    <Public />
  }
    {/* <Header />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/home' element={<Home />} />
    <Route path='/booking' element={<Booking />} />
    </Routes> */}
    </>
  )
}

export default App

/*

<div className='flex flex-col- justify-center items-start p-4 overflow-auto gap-4'>
<div className='flex gap-4'>
  <div className='flex flex-col justify-center border'>
  <div className='bg-gray-300 flex justify-between items-center px-4'> 
  <div className=' text-lg font-semibold text-gray-600'>UP-71-9090</div>
  <GiSteeringWheel className="w-8 h-12 text-gray-700 animate-spin-slow" />
  </div>
  <div className='p-4 bg-gray-100 overflow-auto'>
    {seat.map((row: any, rowIndex: number) => (
      <div key={rowIndex} className='flex items-center gap-4'>
        {row.map((col: any, colIndex: number) => (
          <button key={colIndex} disabled={!['A', 'S'].includes(col)}
            className={`${['A', 'S'].includes(col) ? '' : 'disabled'}`} onClick={() => { updateSeat(col, rowIndex, colIndex) }}>
            {getSeat(col)}
          </button>
        ))}
      </div>

    ))}
  </div>
  </div>
  
</div>
<div className='flex flex-col'>
  <div className='border flex justify-betwwn items-start flex-col'>
    <div className='bg-gray-300 w-full  px-4 h-12 flex justify-start  items-center text-lg font-semibold text-gray-600'>Info</div>
    {
      SEAT_TYPES.map((item:{label:string, symbol:string}, index:number)=>(
        <div className='flex justify-start items-center py-2 px-4 gap-4' key={index} disabled={!['A', 'S'].includes(item.symbol)}
            >
            {getSeat(item.symbol)} <span className='text-md font-semibold text-gray-600'>{item.label}</span>
          </div>
      ))
    }
  </div>
  </div>
</div>
*/
 

// <div className='grid grid-cols-1 md:grid-cols-3'>
          
//           </div>
//           <div className='grid grid-cols-1 xl:grid-cols-4 gap-4'>
//             <div className='md:col-span-1 lg:col-span-1'>
//               <Card
//                 title={"Bus Info"}
//                 cardClass="flex flex-col bg-gray-200 rounded-md"
//                 headerClass="p-2 text-gray-600 font-semibold border-b border-gray-400 dark:border-gray-600"
//                 bodyClass="p-2"
//               >
//                 <div className='flex flex-col justify-start items-start'>
//                   <div className='flex items-center gap-2'>
//                     <div>
//                       <FiMapPin className="text-green-600 w-8 h-8" />
//                     </div>
//                     <div className='text-sm py-2'>
//                       <span className='font-semibold text-green-600'> Origin: </span> 1203 and 1204, Level 12, Building No. 20, Raheja Mindspace, Cyberabad, Madhapur, Hitech City Hyderabad Hyderabad TG IN 500081
//                     </div>
//                   </div>
  
//                   <div className='flex items-center gap-2'>
//                     <div>
//                       <FiMapPin className="text-red-600 w-8 h-8" />
//                     </div>
//                     <div className='text-sm py-2'>
//                       <span className='font-semibold text-red-600' >Destination:</span> No 3, RMZ Infinity - Tower E, Old Madras Road, 4th & 5th Floors, Bangalore Bangalore KA 560016 IN</div>
//                   </div>
  
//                   <div className='flex items-center gap-2'>
//                     <div>
//                       <BiBus className="text-sky-600  w-9 h-9" />
//                     </div>
//                     <div className='text-sm py-2'>
//                       <span className='font-semibold text-sky-600' >Bus Number:</span> KN-09-NC-9089</div>
//                   </div>
  
//                   <div className='flex items-center gap-2'>
//                     <div>
//                       <MdOutlineDepartureBoard className="text-sky-600  w-10 h-10" />
//                     </div>
//                     <div className='text-sm py-2'>
//                       <span className='font-semibold text-sky-600' >Departure:</span> 18/08/2023 11:45 PM</div>
//                   </div>
  
//                   <div className='flex items-center gap-2'>
//                     <div>
//                       <MdOutlineDepartureBoard className="text-sky-600  w-10 h-10" />
//                     </div>
//                     <div className='text-sm py-2'>
//                       <span className='font-semibold text-sky-600' >Arrival:</span> 19/08/2023 09:45 AM</div>
//                   </div>
//                 </div>
//               </Card>
//             </div>
//             <Card
//                 title={"Select Seat"}
//                 cardClass="flex flex-col bg-gray-200 rounded-md w-full"
//                 headerClass="p-2 text-gray-600 font-semibold border-b border-gray-400 dark:border-gray-600"
//                 bodyClass=""
//               >
//                 <div className='bg-gray-300 flex justify-center items-center px-4 py-2'>
//                   <div className=' text-md font-semibold text-gray-600'>Front Side</div>
//                 </div>
//                 <div className='flex flex-col justify-center items-center p-4 bg-gray-100 overflow-auto'>
  
//                   {seat.map((row: any, rowIndex: number) => (
//                     <div key={rowIndex} className='flex items-center gap-4'>
//                       {row.map((col: any, colIndex: number) => (
//                         <button key={colIndex} disabled={!['A', 'S'].includes(col.bookingStatus)}
//                           className={`m-2`} onClick={() => { updateSeat(col.bookingStatus, rowIndex, colIndex) }}>
//                           <SeatingSeat seat={col.bookingStatus} />
//                           <SleeperSeat seat={col.bookingStatus} />
//                           {getSeat(col.bookingStatus)}
//                         </button>
//                       ))}
//                     </div>
  
//                   ))}
//                 </div>
//                 <div className='bg-gray-300 flex justify-center items-center px-4 py-2'>
//                   <div className=' text-md font-semibold text-gray-600'>Back Side</div>
//                 </div>
//               </Card>
//               <Card
//                 title={"Select Seat"}
//                 cardClass="flex flex-col bg-gray-200 rounded-md w-full"
//                 headerClass="p-2 text-gray-600 font-semibold border-b border-gray-400 dark:border-gray-600"
//                 bodyClass=""
//               >
//                 <div className='bg-gray-300 flex justify-center items-center px-4 py-2'>
//                   <div className=' text-md font-semibold text-gray-600'>Front Side</div>
//                 </div>
//                 <div className='flex flex-col justify-center items-center p-4 bg-gray-100 overflow-auto'>
  
//                   {seat.map((row: any, rowIndex: number) => (
//                     <div key={rowIndex} className='flex items-center gap-4'>
//                       {row.map((col: any, colIndex: number) => (
//                         <button key={colIndex} disabled={!['A', 'S'].includes(col.bookingStatus)}
//                           className={`m-2`} onClick={() => { updateSeat(col.bookingStatus, rowIndex, colIndex) }}>
//                           <SeatingSeat seat={col.bookingStatus} />
//                           <SleeperSeat seat={col.bookingStatus} />
//                           {getSeat(col.bookingStatus)}
//                         </button>
//                       ))}
//                     </div>
  
//                   ))}
//                 </div>
//                 <div className='bg-gray-300 flex justify-center items-center px-4 py-2'>
//                   <div className=' text-md font-semibold text-gray-600'>Back Side</div>
//                 </div>
//               </Card>
  
//             <div className='md:col-span-1 lg:col-span-1'>
//               <Card
//                 title={"Seat Info"}
//                 cardClass="flex flex-col bg-gray-200 rounded-md mb-2"
//                 headerClass="p-2 text-gray-600 font-semibold border-b border-gray-400 dark:border-gray-600"
//                 bodyClass="p-2"
//               >
//                 {BUS_SEATING_SEAT_TYPES.map((item: { label: string, symbol: string }, index: number) => (
//                   <div className='flex justify-start items-center py-1 gap-4' key={index} disabled={!['A', 'S'].includes(item.symbol)}
//                   >
//                     {<SleeperSeat seat={item.symbol} >
//                        </SleeperSeat>}
//                        <span className='text-md font-semibold text-gray-600'>{item.label}</span> 
  
//                   </div>
//                 ))}
//               </Card>
//               <Card
//                 title={"Selected Seat Info"}
//                 cardClass="flex flex-col bg-gray-200 rounded-md mb-2"
//                 headerClass="p-2 text-gray-600 font-semibold border-b border-gray-400 dark:border-gray-600"
//                 bodyClass="p-2"
//               >
//                 <div className='border-b-2 border-gray-400 py-2'>
//                   <div className='text-sm font-bold text-black '>Onward Journey </div>
//                   <div className='text-md font-normal text-gray-900'>From <span className='font-semibold text-gray-600'>Hyderabad</span> To <span className='font-semibold text-gray-600'>Bengaluru</span></div>
//                   <div className='text-md font-normal text-gray-900'>On <span className='font-semibold text-gray-600'>20 August, 2023</span></div>
//                 </div>
//                 <div className='border-b-2 border-gray-400 py-2'>
//                   <div className='text-sm font-bold text-black '>Seats Selected </div>
//                   <div className='text-md font-normal text-gray-900'> <span className='font-semibold text-gray-600'>Seat(s):</span> {seat.filter((item: any) => item.bookingStatus === 'S').length}</div>
//                   <div className='text-md font-normal text-gray-900'> <span className='font-semibold text-gray-600'>Total Fare:</span> 3600 [1200 X 3]</div>
//                 </div>
//                 <div className='my-2'>
//                   <Button btnClass='w-full bg-green-400 p-1.5 hover:bg-green-600 hover:text-white' title='Continue to Payment' />
//                 </div>
//               </Card>
//             </div>
//           </div>