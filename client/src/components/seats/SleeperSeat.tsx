import React from 'react'
import {LuPersonStanding} from 'react-icons/lu'
export default function SleeperSeat({seat}:any) {
    console.log(seat)
    switch (seat) {
        case 'A':
          return <div className="flex justify-center items-center w-8 h-16 border-2 border-green-400 text-green-400 bg-green-200 cursor-pointer">
            <LuPersonStanding className="rotate-180 h-16 w-8" />
          </div>
        case 'B':
          return <div className="flex justify-center items-center w-8 h-16 border-2 border-red-400 text-red-400 bg-red-200 cursor-not-allowed">
            <LuPersonStanding className="rotate-180 h-16 w-8" />
          </div>
        case 'S':
          return <div className="flex justify-center items-center w-8 h-16 border-2 border-sky-400 text-sky-400 bg-sky-200 cursor-pointer">
            <LuPersonStanding className="rotate-180 h-16 w-8" />
          </div>
        case 'R':
          return <div className="flex justify-center items-center w-8 h-16 border-2 border-gray-400 text-gray-400 bg-gray-200 cursor-not-allowed">
            <LuPersonStanding className="rotate-180 h-16 w-8" />
          </div>
        default:
          return <div className="w-8 h-16"></div>
      }
}
