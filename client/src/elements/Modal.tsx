import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button from "./Button";
import { SlClose } from "react-icons/sl";
export default function Modal({
  onClose,
  show,
  title,
  modalSizeCss = "w-3/4 md:w-2/3 lg:w-1/2",
  body,
  footer,
}: any) {
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-400 dark:bg-gray-900  opacity-90" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full ${modalSizeCss}  transform overflow-hidden rounded-md bg-white dark:bg-gray-800  text-left align-middle border border-gray-300 dark:border-gray-200 shadow-md shadow-gray-200 dark:shadow-gray-600 transition-all`}
                >
                  <Dialog.Title
                    as="div"
                    className="flex justify-between items-center text-md font-semibold  text-gray-600 dark:text-gray-200 border-b border-gray-200 dark:border-gray-200 px-4 py-4"
                  >
                    {title}
                    <Button
                      classNames="!w-auto !text-gray-400 !dark:text-gray-200"
                      Icon={SlClose}
                      IconSize={24}
                      onClick={onClose}
                    />
                  </Dialog.Title>
                  <div className="mt-2 p-4">{body}</div>

                  <div className="mt-4 p-4">{footer}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
