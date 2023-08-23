/* eslint-disable @typescript-eslint/no-explicit-any */
import { Switch } from "@headlessui/react";
import { useTheme } from "@contexts/ThemeContext";

import { BiSolidSun, BiSolidMoon } from "react-icons/bi";

export default function ThemeSwitch({ themeSwitchClass }: any) {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleTheme}
      className={`${isDarkMode ? "bg-yellow-500" : "bg-gray-700"}
          relative inline-flex 
          h-[34px] w-[70px] shrink-1 cursor-pointer rounded-full border-2 
          border-transparent transition-colors duration-200 ease-in-out
          focus:outline-none focus-visible:ring-2
           focus-visible:ring-white 
        focus-visible:ring-opacity-75 ${themeSwitchClass}`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${isDarkMode ? "translate-x-9" : "translate-x-0"}
            pointer-events-none h-[30px] w-[30px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out
            flex justify-center items-center`}
      >
        {isDarkMode ? (
          <BiSolidMoon className="text-gray-700" />
        ) : (
          <BiSolidSun className="text-yellow-500" />
        )}
      </span>
    </Switch>
  );
}
