import { useAuth } from '@contexts/AuthContext'
import React from 'react'

// export default function Header() {
//   const {userContext} = useAuth()
//   console.log({userContext})
//   return (
//     <div className='h-16 flex justify-between items-center bg-transparent px-4 lg:px-32'>
//         <div className='flex justify-between items-center w-full'>
//             <div>Nikhil~Bus</div>
//             <div className='text-black'>{userContext.name || 'NA'}</div>
//             <div className='w-8 h-8 bg-pink-400 rounded-full flex justify-center items-center'>N</div>
//         </div>
//     </div>
//   )
// }

import darkLogo from "@assets/dark-logo.png";
import lightLogo from "@assets/light-logo.png";
import { useTheme } from "@contexts/ThemeContext";
import ThemeSwitch from "@components/themes/ThemeSwitch";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import MobileHeader from './MobileHeader';
import Test from './Test';

export default function Header() {
  const navigate = useNavigate();

  const { isDarkMode } = useTheme();

  return (
    <div className="hidden md:flex z-10 justify-start items-center h-16 px-2 md:px-32 py-4 md:py-4 gap-4 backdrop-filter bg-transparent backdrop-blur-lg bg-opacity-70 sticky -top-0.5 bottom-0.5 border-b border-gray-200 dark:border-gray-600">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          className=""
          src={!isDarkMode ? darkLogo : lightLogo}
          height={48}
          width={48}
        />
      </div>
      <div className="flex justify-between items-center gap-4 w-full">
      <div className="flex items-center gap-4">
         <ul className='flex items-center justify-start gap-4'>
          <li>Onboarding</li>
          <li>Vachile</li>
          <li>Trip Planner</li>
         </ul>
      

        
      </div>
      <div className="flex items-center gap-4">
       
        <UserMenu />

        <ThemeSwitch />
      </div>
         
      </div>
     
    </div>
  );
}

