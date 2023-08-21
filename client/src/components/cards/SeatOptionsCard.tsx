import SeatingSeat from "@components/seats/SeatingSeat";
import { BUS_SEATING_SEATS } from "@data/static/busSeats";
import { BUS_SEATING_SEAT_TYPES, SEAT_TYPE_ACTIONS_FOR_LAYOUT } from "@data/static/seatTypes";
import { Children, useState } from "react";


export default function SeatOptionsCard({cardId,children,onClick}:any) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    return (
      <div
      id={cardId}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        {isHovered && (
          <div className="absolute left-0 px-2 py-1 bg-white z-10">
            {SEAT_TYPE_ACTIONS_FOR_LAYOUT.map((seat:any,index:number) => (
                 <div className='flex justify-start items-center py-1 gap-2' key={index} onClick={()=>onClick(seat.symbol)}>
                   
                   <SeatingSeat seat={seat.symbol} />
                   <div className='text-md font-semibold text-gray-600 w-full'>{seat.label}</div>
                   
 
                 </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
   