import { useAuth } from "@contexts/AuthContext";
import React, { useState } from "react";
import { PiListBold } from "react-icons/pi";
// export default function Header() {
//   const {userContext} = useAuth()
//   // console.log({userContext})
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
import MobileHeader from "./MobileHeader";
import Test from "./Test";
import AdminNavbar from "./AdminNavbar";

export default function Header() {
  const navigate = useNavigate();
  const { userContext } = useAuth();
  const [open, setOpen] = useState(false);
  const { isDarkMode } = useTheme();
  console.log({ userContext });
  return (
    <div className="hidden md:flex z-10 justify-between items-center dark:!bg-gray-800 h-16 px-2 lg:px-32 py-4 md:py-4 gap-4 backdrop-filter bg-transparent backdrop-blur-lg bg-opacity-70 sticky -top-0.5 bottom-0.5 border-b border-gray-200 dark:border-gray-600">
      <div className="flex justify-start items-center gap-4 lg:gap-8">
        <img
          className=""
          src={!isDarkMode ? darkLogo : lightLogo}
          height={48}
          width={48}
          onClick={() => {
            navigate("/");
          }}
        />
        {userContext?.roles?.includes("ADMIN") && (
          <PiListBold
            onClick={() => {
              setOpen(!open);
            }}
            className="w-8 h-8 text-gray-800 dark:text-gray-200"
          />
        )}
      </div>
      {userContext?.roles?.includes("ADMIN") && (
        <AdminNavbar open={open} setOpen={setOpen} />
      )}
      <div className="flex items-center  gap-4 lg:gap-8">
        <UserMenu />
        <ThemeSwitch />
      </div>
    </div>
  );
}
