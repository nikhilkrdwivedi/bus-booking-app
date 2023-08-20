
import Container from '@components/containers/Container'
import moment from 'moment'
import { FaRupeeSign } from 'react-icons/fa'
import Header from '@components/headers/Header'
import Button from '@elements/Button'
import { BUS_DETAILS } from '@data/static/busDetails'
import { useNavigate } from 'react-router-dom'
export default function Home() {
    const naviagte = useNavigate()
  return (
    <>
    {/* <Header /> */}
  <Container className='px-2 md:px-4 lg:px-24 xl:px-32 bg-gray-800 w-full h-screen overflow-auto'>
    {BUS_DETAILS.map((bus:any,index:number)=>(
      <div key={index} className='grid grid-cols-1 md:grid-cols-3 bg-gray-800 my-2 md:my-4 md:gap-4 border-2 rounded-md'>
        <div className='col-span-1'>
<div className='flex justify-center items-center md:items-start flex-col p-4'>
<div className='text-white font-semibold text-md '>{bus.provider.company}</div>
          <div className='text-white  font-normal text-sm '>{bus.vehicle.info}</div>
<div className=' flex justify-start items-center gap-1'>             
<div className='text-white  font-normal text-sm '>Ratings - {bus.performance.ratings}</div>
          <div className='text-white  font-normal text-sm '>({bus.performance.counts})</div></div>
</div>
        </div>
        <div className='md:col-span-1'>
       <div className='flex justify-center items-center flex-col p-4 '>
       <div className='text-white font-normal text-md '>from <span className='font-semibold text-white'>{bus.tripDescription.departureFrom}</span> to <span className='font-semibold text-white'>{bus.tripDescription.arrivedTo} </span></div>
        <div className='text-white font-normal text-sm '> {moment(bus.tripDescription.departureAt).format('MMM Do YY, hh:mm A')} - {moment(bus.tripDescription.arrivedAt).format('MMM Do YY, hh:mm A')} </div>
        <div className='text-white font-normal text-sm '> {bus.tripDescription.travelTime} </div>
       </div>

        </div>
        <div className='col-span-1'>
          <div className='flex justify-start items-center md:items-end flex-col p-4'>
              <div className='flex justify-start items-center text-lg font-bold text-white'><FaRupeeSign /> 909</div>
          </div>
        </div>
        <div className='col-span-1 md:col-span-3 border-t-2'>
          <div className='flex justify-center items-end flex-col p-4'>
          <Button btnClass='w-32 bg-green-400 p-1.5 hover:bg-green-500 text-sm font-semibold hover:text-white' title='Book Now' onClick={()=>naviagte('/booking', {state:bus})} />
          </div>
        </div>

      </div>
    ))}
  </Container>
</>
  )
}
