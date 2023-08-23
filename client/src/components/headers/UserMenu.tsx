/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { HiMiniChevronDown } from "react-icons/hi2";
import { toast } from "react-toastify";
import { logout } from "@data/rest/authentication";
import { useTheme } from "@contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BiSolidUserDetail } from "react-icons/bi";
import { useAuth } from "@contexts/AuthContext";
import { LuBookPlus } from "react-icons/lu";

export default function UserMenu() {
  const { userContext, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  async function logoutUser() {
    try {
      await logout({ allDeviceLogout: false });
      setIsAuthenticated(false);
      navigate("/get-started");
    } catch (error: any) {
      const errorMsg = error.message;
      toast(errorMsg, {
        type: "error",
        theme: isDarkMode ? "dark" : "light",
      });
    }
  }

  if (!isAuthenticated) return null;

  return (
    <Menu
      as="div"
      className="relative inline-block text-left items-center gap-2"
    >
      <div className="flex items-center w-auto justify-center">
        <Menu.Button className="flex w-full justify-between items-center gap-2 text-gray-600 dark:text-gray-200">
          <div className="h-[34px] w-[34px] rounded-full bg-gray-100 dark:bg-gray-800 flex justify-center items-center text-lg font-semibold shadow-md shadow-gray-400 dark:shadow-gray-200 ">
            {userContext?.name?.charAt(0) || "😀"}
          </div>
          <HiMiniChevronDown
            size={24}
            className="hover:text-gray-300 dark:hover:text-gray-100"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-200  dark:divide-gray-600 rounded-md bg-white dark:bg-gray-800 shadow-gray-400 dark:shadow-gray-200 shadow-md ring-1 ring-black dark:ring-gray-600 ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2">
            <Menu.Item>
              {() => (
                <div
                  onClick={() => navigate("/profile")}
                  className="flex justify-start items-center gap-4 text-gray-600 dark:text-gray-200 cursor-pointer"
                >
                  <div>
                    <BiSolidUserDetail size={24} />
                  </div>
                  <div className="text-md font-semibold">Profile</div>
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="px-4 py-2">
            <Menu.Item>
              {() => (
                <div
                  onClick={() => navigate("/your-booking")}
                  className="flex justify-start items-center gap-4 text-gray-600 dark:text-gray-200 cursor-pointer"
                >
                  <div>
                    <LuBookPlus size={24} />
                  </div>
                  <div className="text-md font-semibold">Booking</div>
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="px-4 py-2">
            <Menu.Item>
              {() => (
                <div
                  onClick={() => logoutUser()}
                  className="flex justify-start items-center gap-4 text-gray-600 dark:text-gray-200 cursor-pointer"
                >
                  <div>
                    <RiLogoutCircleRLine size={24} />
                  </div>
                  <div className="text-md font-semibold">Sign Out</div>
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
