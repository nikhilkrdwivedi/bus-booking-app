import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import ThemeSwitch from "@components/themes/ThemeSwitch";
import { BiSolidUserDetail } from "react-icons/bi";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import darkLogo from "@assets/dark-logo.png";
import lightLogo from "@assets/light-logo.png";
import { useTheme } from "@contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import useAuthentication from "@hooks/useAuthentication";
import { toast } from "react-toastify";
import { logout } from "@data/rest/authentication";

export default function MobileHeader() {
  const navigate = useNavigate();
  const { resetIsAuthenticatedAndUserContext, userContext, isAuthenticated } =
    useAuthentication();

  const { isDarkMode } = useTheme();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  async function logoutUser() {
    try {
      await logout({ allDeviceLogout: false });
      await resetIsAuthenticatedAndUserContext();
      navigate("/");
    } catch (error) {
      const errorMsg = error.message;
      toast(errorMsg, {
        type: "error",
        theme: isDarkMode ? "dark" : "light",
      });
    }
  }
  return (
    <>
      <div
        className="md:hidden   
      z-10 flex justify-between items-center h-16 p-4 md:px-20 md:py-4 gap-4 backdrop-filter bg-transparent backdrop-blur-lg bg-opacity-70 sticky -top-0.5 bottom-0.5 border-b border-gray-200 dark:border-gray-600"
      >
        <img
          onClick={() => {
            navigate("/");
          }}
          className=""
          src={!isDarkMode ? darkLogo : lightLogo}
          height={48}
          width={48}
        />
        {isAuthenticated ? (
          <RiMenuFoldLine
            className="text-gray-600 dark:text-gray-200 fill-current"
            size={36}
            onClick={() => setOpen(true)}
          />
        ) : (
          <ThemeSwitch />
        )}
      </div>
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
              <div className="fixed inset-0 bg-gray-200 dark:bg-gray-800 transition-opacity" />
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
                          <RiMenuUnfoldLine
                            className="text-gray-600 dark:text-gray-200 fill-current"
                            size={36}
                            onClick={() => setOpen(false)}
                          />
                        </div>
                      </Transition.Child>
                      <div className="flex h-full flex-col bg-white dark:bg-gray-900 shadow-xl">
                        <div className="bg-gray-100 dark:bg-gray-900  shadow-md dark:shadow-sm shadow-gray-200 dark:shadow-gray-600">
                          <Dialog.Title className="flex items-center p-3">
                            <div>
                              <div className="h-[34px] w-[34px] rounded-full bg-gray-100 dark:bg-gray-800 flex justify-center items-center text-lg font-semibold shadow-md shadow-gray-400 dark:shadow-gray-200 text-gray-600 dark:text-gray-200 ">
                                {userContext?.name?.charAt(0) || "😀"}
                              </div>
                            </div>

                            <div className="flex flex-col w-full">
                              <span className="flex items-center gap-1 text-gray-600 dark:text-white text-sm font-semibold px-2 truncate text-ellipsis w-5/6">
                                {userContext?.name || "NA"}
                                {/* <FaTwitterSquare
                                  width="16px"
                                  height="16px"
                                  className="text-green-600 dark:text-yellow-600"
                                /> */}
                              </span>
                              <span className=" text-gray-400 text-xs font-normal px-2 truncate text-ellipsis w-5/6">
                                {userContext?.email}
                              </span>
                            </div>
                            <div>
                              <ThemeSwitch />
                            </div>
                          </Dialog.Title>
                        </div>
                        <div className="relative flex-1 overflow-y-scroll bg-gray-200 dark:bg-gray-900">
                          <div className="flex flex-col h-full justify-between">
                            <div className="overflow-auto">
                              <div
                                onClick={() => navigate("/profile")}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600  cursor-pointer"
                              >
                                <div>
                                  <BiSolidUserDetail size={24} />
                                </div>
                                <div>{t("View Profile")}</div>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border-y-2 border-gray-300 dark:border-gray-600  cursor-pointer">
                                <div>
                                  <BiSolidUserDetail
                                    size={24}
                                    className="text-gray-600 dark:text-gray-200"
                                  />
                                </div>
                                <div onClick={() => logoutUser()}>
                                  <span>{t("Sign Out")}</span>
                                </div>
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
