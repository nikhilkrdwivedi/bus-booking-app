import { TbArmchair } from 'react-icons/tb'

export default function SeatingSeat({seat}:any) {
    // console.log(seat)
    switch (seat) {
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
