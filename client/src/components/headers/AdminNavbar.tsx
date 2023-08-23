import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BiTrip } from "react-icons/bi";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { BsDatabaseFillLock } from "react-icons/bs";
import { AiFillCar, AiOutlineClose } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { useTheme } from "@contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";

export default function AdminNavbar({ open, setOpen }: any) {
  const navigate = useNavigate();
  const { userContext, isAuthenticated } = useAuth();

  const { isDarkMode } = useTheme();

  return (
    <>
      {isAuthenticated && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-200 dark:bg-gray-800 transition-opacity opacity-50" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-12">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute left-0 top-0 -ml-10 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                          <span className="sr-only">Close panel</span>
                          <AiOutlineClose
                            className="text-gray-600 dark:text-gray-200 fill-current"
                            size={36}
                            onClick={() => setOpen(false)}
                          />
                        </div>
                      </Transition.Child>
                      <div className="flex h-full flex-col bg-white dark:bg-gray-900 shadow-xl">
                        <div className="bg-gray-100 dark:bg-gray-900  shadow-md dark:shadow-sm shadow-gray-200 dark:shadow-gray-600">
                          <Dialog.Title className="flex items-center p-3">
                            <div className="flex justify-start items-center gap-2 text-gray-600 dark:text-gray-200 text-md font-medium  p-1">
                              <BsDatabaseFillLock className="w-8 h-8" />
                              Admin Actions
                            </div>
                          </Dialog.Title>
                        </div>
                        <div className="relative flex-1 overflow-y-scroll bg-gray-200 dark:bg-gray-900">
                          <div className="flex flex-col h-full justify-between">
                            <div className="overflow-auto">
                              <div
                                onClick={() => navigate("/providers")}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-200  cursor-pointer"
                              >
                                <div>
                                  <FaUserPlus size={24} />
                                </div>
                                <div>{"Providers"}</div>
                              </div>
                              <div
                                onClick={() => navigate("/vehicles")}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-200  cursor-pointer"
                              >
                                <div>
                                  <AiFillCar size={24} />
                                </div>
                                <div>{"Vehicles"}</div>
                              </div>
                              <div
                                onClick={() => navigate("/trip-planner")}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-200  cursor-pointer"
                              >
                                <div>
                                  <BiTrip size={24} />
                                </div>
                                <div>{"Trip Planner"}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}
