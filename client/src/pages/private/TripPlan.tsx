import Container from '@components/containers/Container'
import React from 'react'
import { Disclosure } from '@headlessui/react'
import { BiChevronsDown } from 'react-icons/bi'
export default function TripPlan() {
    return (
        <Container className='px-2 md:px-4 lg:px-20 xl:px-32 bg-gray-800 w-full h-screen overflow-auto'>
            <div className='grid grid-cols-2 md:grid-cols-2'>
                <div className='flex flex-col gap-4 '>
                    <Disclosure as="div" >
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>What is your refund policy?</span>
                                    <BiChevronsDown
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                    If you're unhappy with your purchase for any reason, email us
                                    within 90 days and we'll refund you in full, no questions asked.
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                    <Disclosure as="div" >
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>What is your refund policy?</span>
                                    <BiChevronsDown
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                    If you're unhappy with your purchase for any reason, email us
                                    within 90 days and we'll refund you in full, no questions asked.
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
                <div>

                </div>

            </div>


        </Container>

    )
}




// export default function Example() {
//   return (
//     <div className="w-full px-4 pt-16">
//       <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
//         <Disclosure>
//           {({ open }) => (
//             <>
//               <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
//                 <span>What is your refund policy?</span>
//                 <ChevronUpIcon
//                   className={`${
//                     open ? 'rotate-180 transform' : ''
//                   } h-5 w-5 text-purple-500`}
//                 />
//               </Disclosure.Button>
//               <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
//                 If you're unhappy with your purchase for any reason, email us
//                 within 90 days and we'll refund you in full, no questions asked.
//               </Disclosure.Panel>
//             </>
//           )}
//         </Disclosure>
//         <Disclosure as="div" className="mt-2">
//           {({ open }) => (
//             <>
//               <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
//                 <span>Do you offer technical support?</span>
//                 <ChevronUpIcon
//                   className={`${
//                     open ? 'rotate-180 transform' : ''
//                   } h-5 w-5 text-purple-500`}
//                 />
//               </Disclosure.Button>
//               <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
//                 No.
//               </Disclosure.Panel>
//             </>
//           )}
//         </Disclosure>
//       </div>
//     </div>
//   )
// }
